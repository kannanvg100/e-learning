import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import courseReducer from './slices/courseSlice'
import { apiSlice } from './slices/apiSlice'

const rootReducer = combineReducers({
	user: userReducer,
    course: courseReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store
