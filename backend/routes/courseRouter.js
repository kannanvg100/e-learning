const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController')
const { protect } = require('../middlewares/auth')
const upload = require('../config/multer')

router.get('/courses', protect, courseController.getCourses)
router.get('/course/:id', protect, courseController.getCourseByID)
router.delete('/delete-course/:id', protect, courseController.deleteCourse)
router.patch('/update-course-status/:id', protect, courseController.updateCourseStatus)
router.post('/create-course', protect, upload.single('thumbnail'), courseController.createCourse)
router.post('/course/:id/thumbnail', protect, upload.single('thumbnail'), courseController.updateCourseImage)
router.patch('/update-course/:id', protect, upload.single('thumbnail'), courseController.updateCourse)

module.exports = router
