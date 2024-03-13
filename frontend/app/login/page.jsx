'use client'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addUser } from '@/redux/slices/userSlice'
import { useLoginMutation } from '@/redux/slices/usersApiSlice'

export default function page() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({})
	const router = useRouter()
	const dispatch = useDispatch()
	const [loginUser, { isLoading }] = useLoginMutation()
	const handleLogin = async () => {
		try {
			const res = await loginUser({ email, password })
			dispatch(addUser(res.data.user))
			router.replace('/')
		} catch (error) {
			toast.error('Something went wrong.')
		}
	}
	return (
		<div className="flex flex-col gap-2 w-[300px] mx-auto">
			<Input
				label="Email"
				type="email"
				variant="flat"
				radius="none"
				classNames={{
					inputWrapper: 'text-default-500',
					input: 'bg-red-100',
				}}
				onChange={(e) => {
					setEmail(e.target.value.trim())
					setErrors({ ...errors, email: '' })
				}}
				errorMessage={errors?.email}
				isInvalid={errors?.email ? true : false}
				size="md"
			/>
			<Input
				label="Password"
				type="password"
				variant="flat"
				radius="none"
				classNames={{
					inputWrapper: 'text-default-500',
				}}
				onChange={(e) => {
					setPassword(e.target.value.trim())
					setErrors({ ...errors, password: '' })
				}}
				errorMessage={errors?.password}
				isInvalid={errors?.password ? true : false}
				size="md"
			/>
			<Button isLoading={isLoading} onClick={handleLogin}>Login</Button>
		</div>
	)
}
