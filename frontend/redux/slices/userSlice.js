import { createSlice } from '@reduxjs/toolkit'

const storedUserInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo');
const initialState = storedUserInfo ? JSON.parse(storedUserInfo) : null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return action.payload; 
        },
        removeUser: (state) => {
            localStorage.removeItem('userInfo')
            return null;
        },
    },
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer
