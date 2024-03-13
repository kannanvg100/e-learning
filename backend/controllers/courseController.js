const Course = require('../models/Course')
const Chapter = require('../models/Chapter')

module.exports = {

    // Get all courses
    getCourses: async (req, res, next) => {
        try {
            let { page, count, search, sort, filter } = req.query

            page = parseInt(page) || 1
            count = parseInt(count) || 10

            const sortQuery = {}
            if (sort) {
                if (sort === 'latest') sortQuery['createdAt'] = -1
                if (sort === 'price-desc') sortQuery['price'] = -1
                if (sort === 'price-asc') sortQuery['price'] = 1
                // TODO: Add more sort options
                // if(sort === 'popular') sortQuery['enrolledCount'] = -1
                // if(sort === 'highest-rated') sortQuery['rating'] = -1
            }

            let filterArray = [{ status: 'published' }]

            filter = decodeURIComponent(filter)
            if (filter) {
                filter.split('&').forEach((item) => {
                    const [key, value] = item.split('=')
                    if (key === 'level') filterArray.push({ level: { $in: value.split(',') } })
                    if (key === 'category') filterArray.push({ category: { $in: value.split(',') } })
                    if (key === 'price') {
                        const [min, max] = value.split('-')
                        filterArray.push({ price: { $gte: min, $lte: max } })
                    }
                })
            }

            search = decodeURIComponent(search)
            const escapedSearchQuery = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            if (escapedSearchQuery) {
                filterArray.push({
                    $or: [
                        { $text: { $search: escapedSearchQuery } },
                        { title: { $regex: new RegExp(escapedSearchQuery, 'i') } },
                    ],
                })
            }

            const totalCourses = await Course.countDocuments({ $and: filterArray })
            const courses = await Course.find({ $and: filterArray })
                .populate('teacher', 'name profileImage')
                .sort(sortQuery)
                .limit(count)
                .skip((page - 1) * count)
                .lean()

            if (req.user) {
                const favorites = await Favorite.find({ user: req.user._id })
                courses.forEach((course) => {
                    course.isFavorite = favorites.some(
                        (favorite) => favorite.course.toString() === course._id.toString()
                    )
                })
            }
            res.status(200).json({ success: true, totalCourses, courses })
        } catch (error) {
            next(error)
        }
    },

    // Get all courses
    getAllCourses: async (req, res, next) => {
        try {
            const { page, count, query, status, sort } = req.query
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

            let filterQuery = {
                teacher: req.user._id,
                $or: [{ $text: { $search: query } }, { title: { $regex: new RegExp(escapedQuery, 'i') } }],
            }

            if (status) filterQuery['status'] = { $in: status.split(',') }

            let sortQuery = {}
            if (sort) {
                const [key, value] = sort.split('-')
                sortQuery[key] = value === 'descending' ? -1 : 1
            }

            const totalCourses = await Course.countDocuments(filterQuery)
            const courses = await Course.find(filterQuery)
                .sort(sortQuery)
                .limit(count)
                .skip((page - 1) * count)
                .populate('category', 'title')
            res.status(200).json({ success: true, totalCourses, courses })
        } catch (error) {
            next(error)
        }
    },

    // Get all courses of all teachers
    getCoursesByAdmin: async (req, res, next) => {
        try {
            const { page, count, query, status, sort } = req.query
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

            let filterQuery = {
                $or: [{ $text: { $search: query } }, { title: { $regex: new RegExp(escapedQuery, 'i') } }],
            }

            if (status) filterQuery['status'] = { $in: status.split(',') }

            let sortQuery = {}
            if (sort) {
                const [key, value] = sort.split('-')
                sortQuery[key] = value === 'descending' ? -1 : 1
            }

            const totalCourses = await Course.countDocuments(filterQuery)
            const courses = await Course.find(filterQuery)
                .sort(sortQuery)
                .limit(count)
                .skip((page - 1) * count)
                .populate('teacher', 'name')
                .populate('category', 'title')
            res.status(200).json({ success: true, totalCourses, courses })
        } catch (error) {
            next(error)
        }
    },

    // Get course by ID
    getCourseByID: async (req, res, next) => {
        try {
            const { id: courseId } = req.params
            if (!mongoose.isValidObjectId(courseId)) return res.status(400).json({ message: 'Invalid Course ID' })

            const course = await Course.findById(courseId)
                .select('-__v')
                .populate('teacher', 'name')
                .populate('category', 'title')
                .populate({
                    path: 'chapters',
                    populate: {
                        path: 'segments',
                    },
                })
            res.status(200).json({ success: true, course })
        } catch (error) {
            next(error)
        }
    },

    // Create a course
    createCourse: async (req, res, next) => {
        try {
            const { title, description, category, level, price, faq } = req.body

            if (!title || !title.trim())
                return res.status(400).json({ success: false, errors: { title: 'Title is required' } })

            if (title.trim().length < 3)
                return res
                    .status(400)
                    .json({ success: false, errors: { title: 'Title must be atleast 3 characters long' } })

            if (!category || !category.trim())
                return res.status(400).json({ success: false, errors: { category: 'Category is required' } })

            if (!level || !level.trim())
                return res.status(400).json({ success: false, errors: { level: 'Level is required' } })

            if(!price)
                return res.status(400).json({ success: false, errors: { price: 'Price is required' } })

            if(!faq)
                return res.status(400).json({ success: false, errors: { faq: 'FAQ is required' } })

            let course = await Course.create({title, description, category, level, price, faq, teacher: req.user._id  })
            res.status(200).json({ success: true, course })
        } catch (error) {
            next(error)
        }
    },

    // Update a course
    updateCourse: async (req, res, next) => {
        try {
            const { title, description, category, level, thumbnail, price, mrp } = req.body
            const course = await Course.findById(req.params.id)
            if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
            if (course.teacher.toString() !== req.user.id)
                return res.status(401).json({ success: false, message: 'You are not authorized to update this course' })
            if (title) course.title = title
            if (description) course.description = description
            if (category) course.category = category
            if (level) course.level = level
            if (price) course.price = price
            if (mrp) course.mrp = mrp
            if (thumbnail) {
                const imgUrl = await uploadToS3('courses', req.file)
                if (imgUrl) course.image = `https://levelup.s3.ap-south-1.amazonaws.com/courses/${imgUrl}`
            }
        } catch (error) {
            next(error)
        }
    },

    // Delete a course
    deleteCourse: async (req, res, next) => {
        try {
            const course = await Course.findOne({ _id: req.params.id, teacher: req.user._id })
            if (course) {
                const enrolledCount = await Enrollment.countDocuments({ course: req.params.id })
                if (enrolledCount > 0)
                    return res
                        .status(400)
                        .json({ success: false, message: 'You cannot delete a course which has students enrolled' })
                await Course.findByIdAndDelete(req.params.id)
                res.status(200).json({ success: true, message: 'Course deleted' })
            } else {
                res.status(404).json({ message: 'Course not found' })
            }
        } catch (error) {
            next(error)
        }
    },

    // Update course image
    updateCourseImage: async (req, res, next) => {
        try {
            const { id: courseId } = req.params
            if (!courseId) return res.status(400).json({ success: false, message: 'Invalid request' })
            if (req.file) {
                var imgUrl = await uploadToS3('courses', req.file)
                const course = await Course.findById(courseId)
                course.thumbnail = `https://levelup.s3.ap-south-1.amazonaws.com/courses/${imgUrl}`
                await course.save()
                res.status(200).json({ success: true, thumbnail: course.thumbnail })
            } else {
                res.status(400).json({
                    success: false,
                    errros: { thumbnail: 'Looks like the image you chose didnt work' },
                })
            }
        } catch (error) {
            next(error)
        }
    },

    //set course status
    updateCourseStatus: async (req, res, next) => {
        try {
            const { id: courseId } = req.params
            const { status } = req.body
            if (!courseId) return res.status(400).json({ success: false, message: 'Invalid request' })
            const course = await Course.findById(courseId)
            if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
            if (course.teacher.toString() !== req.user.id)
                return res.status(401).json({ success: false, message: 'You are not authorized to update this course' })

            if (status === 'draft') {
                course.status = 'draft'
                await course.save()
                return res.status(200).json({ success: true, course })
            }

            let errors = {}
            if (!course.title || !course.title.trim()) errors.title = 'Title is required'
            if (!course.description || !course.description.trim()) errors.description = 'Description is required'
            if (!course.category) errors.category = 'Category is required'
            if (!course.level || !course.level.trim()) errors.level = 'Level is required'
            if (!course.price) errors.price = 'Price is required'
            if (!course.mrp) errors.mrp = 'MRP is required'
            if (!course.thumbnail) errors.thumbnail = 'Thumbnail is required'
            if (course.mrp < course.price) errors.mrp = 'MRP should be greater than price'

            if (course.chapters.length === 0) errors.chapters = 'Atleast one chapter is required'
            else {
                for (let i = 0; i < course.chapters.length; i++) {
                    const chapter = await Chapter.findById(course.chapters[i])
                    if (chapter?.segments?.length === 0) {
                        errors.chapters = 'Each chapter should have atleast one segment'
                        break
                    }
                }
            }

            if (Object.keys(errors).length > 0) return res.status(400).json({ success: false, errors })
            if (req.user.status !== 'active')
                return res.status(400).json({ success: false, message: 'Your account is not active yet' })
            course.status = 'published'
            await course.save()
            res.status(200).json({ success: true, course })
        } catch (error) {
            next(error)
        }
    },
}
