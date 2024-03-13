'use client'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function page() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [errors, setErrors] = useState({})

	const router = useRouter()
	const handleLogin = async () => {
		try {
			let err = {}
			if (!email.trim()) err = { ...err, email: 'Email required' }
			const res = await axios.post('/api/signup', { email, password })
			router.replace('/login')
		} catch (error) {
			console.log('📄 > handleLogin > error:', error)
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
			<Input
				label="Password"
				type="password"
				variant="flat"
				radius="none"
				classNames={{
					inputWrapper: 'text-default-500',
				}}
				onChange={(e) => {
					setRePassword(e.target.value.trim())
					setErrors({ ...errors, rePassword: '' })
				}}
				errorMessage={errors?.rePassword}
				isInvalid={errors?.rePassword ? true : false}
				size="md"
			/>
			<Button onClick={handleLogin}>Login</Button>
		</div>
	)
}
