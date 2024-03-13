const mongoose = require('mongoose')
const topicSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please Enter Topic Title'],
		trim: true,
	},
	content: {
		type: String,
		required: [true, 'Please Enter Topic Description'],
		trim: true,
	},
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true,
    },
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Topic', topicSchema)
