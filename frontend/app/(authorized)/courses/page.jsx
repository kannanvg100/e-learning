'use client'
import {
	Avatar,
	Badge,
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Spacer,
	Textarea,
} from '@nextui-org/react'
import { ChevronDown, Film, Image } from 'lucide-react'
import React, { useState } from 'react'

export default function page() {
	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [level, setLevel] = useState('')
	const [description, setDescription] = useState('')
	const [errors, setErrors] = useState({})
	const levels = ['Beginner', 'Intermediate', 'Advanced']
	return (
		<div>
			<Breadcrumbs>
				<BreadcrumbItem className="flex">
					<div class="w-6 h-6 flex justify-center items-center rounded-full bg-primary font-semibold text-white">
						1
					</div>
					<span className="font-bold">Course Information & FAQ</span>
				</BreadcrumbItem>
				<BreadcrumbItem className="flex">
					<div class="w-6 h-6 flex justify-center items-center rounded-full bg-primary font-semibold text-white">
						2
					</div>
					<span className="font-bold">Upload Course materials</span>
				</BreadcrumbItem>
				<BreadcrumbItem className="flex">
					<div class="w-6 h-6 flex justify-center items-center rounded-full bg-primary font-semibold text-white">
						3
					</div>
					<span className="font-bold">Pricing</span>
				</BreadcrumbItem>
				<BreadcrumbItem className="flex">
					<div class="w-6 h-6 flex justify-center items-center rounded-full bg-primary font-semibold text-white">
						4
					</div>
					<span className="font-bold">Publish</span>
				</BreadcrumbItem>
			</Breadcrumbs>
			<Spacer y={4} />
			<p className="text-lg font-semibold">Course Information</p>
			<Spacer y={2} />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<Input
						label="Title"
						labelPlacement="outside"
						className="w-full"
						placeholder="e.g. 'Introductin to Data Analysis'"
						value={title}
						classNames={{
							label: 'text-[14px] font-medium text-default-700',
							inputWrapper: 'text-default-500',
						}}
						onChange={(e) => {
							setTitle(e.target.value)
							setErrors({ ...errors, title: '' })
						}}
						errorMessage={errors?.title}
						radius="none"
					/>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
						<div>
							<p className="text-[14px] font-medium text-default-700 mt-4">Category</p>
							<Spacer y={1} />
							<Dropdown radius="none">
								<DropdownTrigger>
									<Button fullWidth radius="none" variant="flat" endContent={<ChevronDown />}>
										Data Management
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									className="text-default-500"
									aria-label="course category selection"
									variant="flat"
									disallowEmptySelection
									selectionMode="single"
									itemClasses={{
										base: 'rounded-none',
									}}
									onSelectionChange={(key) => {
										setCategory(categories[key.currentKey])
										setErrors({ ...errors, category: '' })
									}}>
									<DropdownItem>Category 1</DropdownItem>
									<DropdownItem>Category 2</DropdownItem>
									<DropdownItem>Category 3</DropdownItem>
									<DropdownItem>Category 4</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<p className="text-tiny text-danger mt-1">{errors?.category}</p>
						</div>

						<div>
							<p className="text-[14px] font-medium text-default-700 mt-4">Difficulty Level</p>
							<Spacer y={1} />
							<Dropdown radius="none">
								<DropdownTrigger>
									<Button fullWidth variant="flat" radius="none" endContent={<ChevronDown />}>
										Basic
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									className="text-default-500"
									aria-label="difficulty level selection"
									variant="flat"
									disallowEmptySelection
									selectionMode="single"
									itemClasses={{
										base: 'rounded-none',
									}}
									onSelectionChange={(key) => {
										setLevel(levels[key.currentKey])
										setErrors({ ...errors, level: '' })
									}}>
									{levels.map((level, index) => (
										<DropdownItem key={index}>{level}</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
							<p className="text-tiny text-danger mt-1">{errors?.level}</p>
						</div>
					</div>
					<Spacer y={2} />
					<Textarea
						label="Description"
						labelPlacement="outside"
						radius="none"
						value={description}
						classNames={{
							label: 'text-[14px] font-medium text-default-700',
							description: 'text-tiny text-default-500 text-start',
							inputWrapper: 'text-default-500',
						}}
						minRows={6}
						onChange={(e) => {
							if (e.target.value.length > 300) return
							setDescription(e.target.value)
							setErrors({ ...errors, description: '' })
						}}
						errorMessage={errors?.description}
						description={`${description?.length || 0}/2000 Characters`}
					/>
					<div>
						<p className="text-[14px] font-medium text-default-700 mt-4">Frequently Asked Questions</p>
						<Spacer y={1} />
						<Input
							className="w-full"
							placeholder="e.g. 'Do you offer 1 on 1 calls'"
							value={title}
							classNames={{
								label: 'text-[14px] font-medium text-default-700',
								inputWrapper: 'text-default-500',
							}}
							onChange={(e) => {
								setTitle(e.target.value)
								setErrors({ ...errors, title: '' })
							}}
							errorMessage={errors?.title}
							radius="none"
						/>
						<Spacer y={1} />
						<Textarea
							radius="none"
							value={description}
							placeholder='e.g. "Yes, at a fixed cost per call"'
							classNames={{
								label: 'text-[14px] font-medium text-default-700',
								description: 'text-tiny text-default-500 text-start',
								inputWrapper: 'text-default-500',
							}}
							minRows={2}
							onChange={(e) => {
								if (e.target.value.length > 300) return
								setDescription(e.target.value)
								setErrors({ ...errors, description: '' })
							}}
							errorMessage={errors?.description}
						/>
						<Spacer y={4} />
						<div className="flex justify-between items-center">
							<Button>Save As Draft</Button>
							<Button color="primary">Save & Continue</Button>
						</div>
					</div>
				</div>
				<div>
					<div>
						<p className="text-[14px] font-medium text-default-700 mt-4">Cover image</p>
						<Spacer y={1} />
						<div className="h-[200px] border-2 border-dashed flex justify-center items-center">
							<Image size={24} />
                            <span className='ms-2'>Upload</span>
						</div>
					</div>
					<div>
						<p className="text-[14px] font-medium text-default-700 mt-4">Sales Video</p>
						<Spacer y={1} />
						<div className="h-[200px] border-2 border-dashed flex justify-center items-center">
							<Film size={24} />
                            <span className='ms-2'>Upload</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
