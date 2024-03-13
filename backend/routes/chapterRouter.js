const express = require('express')
const router = express.Router()
const chapterController = require('../controllers/chapterController')
const { protect } = require('../middlewares/auth')

router.post('/create-chapter/:courseId', protect, chapterController.createChapter)
router.delete('/delete-chapter/:chapterId', protect, chapterController.deleteChapter)
module.exports = router
