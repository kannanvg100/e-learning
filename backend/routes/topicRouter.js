const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicController')
const { protect } = require('../middlewares/auth')

router.post('/create-segment/:chapterId', protect, topicController.createTopic)
router.patch('/edit-segment/:segmentId', protect, topicController.editTopic)
router.delete('/delete-segment/:segmentId', protect, topicController.deleteTopic)

module.exports = router
