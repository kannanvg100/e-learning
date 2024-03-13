const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [
			function () {
				return this.status === 'published'
			},
			'Please Enter Course Title',
		],
		trim: true,
	},
	description: {
		type: String,
		required: [
			function () {
				return this.status === 'published'
			},
			'Please Enter Course Description',
		],
		trim: true,
	},
	price: {
		type: Number,
		required: [
			function () {
				return this.status === 'published'
			},
			'Please Enter Course Price',
		],
		trim: true,
	},
	category: {
		type: String,
		required: [
			function () {
				return this.status === 'published'
			},
			'Please Select Course Category',
		],
	},
	level: {
		type: String,
		enum: ['Basic', 'Intermediate', 'Advanced'],
		required: [
			function () {
				return this.status === 'published'
			},
			'Please Select Course Level',
		],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	chapters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chapter',
			required: [
				function () {
					return this.status === 'published'
				},
				'Please Add Chapters',
			],
		},
	],
    image: {
        type: String,
        required: [
            function () {
                return this.status === 'published'
            },
            'Please Upload Course Image',
        ],
    },
    video: {
        type: String,
        required: [
            function () {
                return this.status === 'published'
            },
            'Please Upload Course Video',
        ],
    },
	status: {
		type: String,
		enum: ['draft', 'published'],
		default: 'draft',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Course', courseSchema)
