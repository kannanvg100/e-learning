import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    description: '',
    level: '',
    price: 0,
    category: '',
    Image: '',
    video: '',
    faq: [
        {
            question: '',
            answer: ''
        }
    ],
    chapters: [
        {
            title: 'Chapter 1',
            topics: [
                {
                    title: 'Topic 1',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nulla deleniti'
                }
            ]
        }
    ]
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        add: (state, action) => {
            state.course = action.payload
            localStorage.setItem('courseInfo', JSON.stringify(action.payload))
        },
        remove: (state) => {
            state.course = null
            localStorage.removeItem('courseInfo')
        },
        addChapter: (state, action) => {
            state.chapters.push(action.payload)
        },
    },
})

export const { add, remove } = courseSlice.actions
export default courseSlice.reducer
