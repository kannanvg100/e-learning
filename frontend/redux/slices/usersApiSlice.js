import { apiSlice } from './apiSlice'
const USERS_URL = 'http://localhost:5000/api'

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: USERS_URL + '/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		signup: builder.mutation({
			query: (credentials) => ({
				url: USERS_URL + '/signup',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		logout: builder.query({
			query: () => ({
				url: USERS_URL + '/logout',
				method: 'GET',
			}),
			invalidatesTags: ['User'],
		}),
        profile: builder.query({
			query: () => ({
				url: USERS_URL + '/profile',
				method: 'GET',
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

export const { useLoginMutation, useLazyLogoutQuery, useSignupMutation, useProfileQuery } = usersApiSlice
