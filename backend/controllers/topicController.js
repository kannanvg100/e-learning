const Topic = require('../models/Topic')
const Chapter = require('../models/Chapter')
const Course = require('../models/Course')

module.exports = {
	// Create new Topic
	createTopic: async (req, res, next) => {
		try {
			const { title, content } = req.body
			const { chapterId } = req.params

			const chapter = await Chapter.findById(chapterId)
			if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' })

			const course = await Course.findById(chapter.course)
			if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
			if (!course.teacher.equals(req.user.id))
				return res.status(403).json({ success: false, message: 'You cannot modify this course' })

			const topic = await Topic.create({
				title,
				content,
				course: course._id,
				chapter: chapter._id,
			})

			chapter.topics.push(topic._id)
			await chapter.save()

			res.status(200).json({ success: true, Topic })
		} catch (error) {
			next(error)
		}
	},

	editTopic: async (req, res, next) => {
		try {
			const { title, description, chapterId } = req.body
			const { topicId } = req.params

			const topic = await Topic.findById(topicId)
			if (!topic) return res.status(404).json({ success: false, message: 'Topic not found' })

			const chapter = await Chapter.findById(chapterId)
			if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' })

			const course = await Course.findById(chapter.course)
			if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
			if (!course.teacher.equals(req.user.id))
				return res.status(403).json({ success: false, message: 'You cannot modify this course' })

			Topic.title = title
			Topic.content = content
			await Topic.save()

			res.status(200).json({ success: true, Topic })
		} catch (error) {
			next(error)
		}
	},

	// Delete a Topic
	deleteTopic: async (req, res, next) => {
		try {
			const { topicId } = req.params

			const topic = await Topic.findById(topicId)
			if (!topic) return res.status(404).json({ success: false, message: 'Topic not found' })
			const chapter = await Chapter.findOne({ topics: topicId })
			if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' })
			const course = await Course.findById(chapter.course)
			if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
			if (!course.teacher.equals(req.user.id))
				return res.status(403).json({ success: false, message: 'You cannot modify this course' })

			await Topic.findByIdAndDelete(topicId)
			chapter.topics.pull(topicId)
			await chapter.save()
			res.status(200).json({ success: true, Topic, message: 'Topic deleted successfully' })
		} catch (error) {
			next(error)
		}
	},

	// Update a Topic
	updateTopic: async (req, res, next) => {
		try {
			const { topicId } = req.params
			const { title, description } = req.body

			const topic = await Topic.findById(topicId)
			if (!topic) return res.status(404).json({ success: false, message: 'Topic not found' })

			const chapter = await Chapter.findOne({ Topics: TopicId })
			if (!chapter) return res.status(404).json({ success: false, message: 'Chapter not found' })
			const course = await Course.findById(chapter.course)
			if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
			if (!course.teacher.equals(req.user.id))
				return res.status(403).json({ success: false, message: 'You cannot modify this course' })
			topic.title = title
			topic.description = description
			await topic.save()
			res.status(200).json({ success: true, topic })
		} catch (error) {
			next(error)
		}
	},

}
