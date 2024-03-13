'use client'
import { add } from '@/redux/slices/courseSlice'
import { Accordion, AccordionItem, Button, Input } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function page() {
	const course = useSelector((state) => state.course)
	const dispatch = useDispatch()
	useEffect(() => {
		console.log('📄 > useEffect > course:', course)
	}, [course])
	const handleAddChapter = () => {
		const newChapter = {
			title: `Chapter ${course.chapters.length + 1}`,
			topics: [
				[
					{
						title: `Topic 1`,
						content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nulla deleniti',
					},
				],
			],
		}
		dispatch(add({ ...course, chapters: [...course.chapters, newChapter] }))
	}
	const handleAddLesson = (index) => {
		const newTopic = {
			title: `Lesson ${course.chapters[index].topics.length + 1}`,
			content: '',
		}
		const newCourse = course.chapters[index].topics.push(newTopic)
		dispatch(add(newCourse))
	}

	if (!course) return null
	return (
		<div>
			<div>
				{course.chapters.map((chapter, index) => (
					<Accordion
						showDivider={false}
						itemClasses={{
							base: 'bg-pink-500 p-0',
							title: 'text-default-900 text-small font-semibold',
							content: 'text-default-700',
						}}>
						<AccordionItem
							key={index}
							className="bg-slate-100 rounded-md px-2 mb-2"
							aria-label={chapter.title}
							title={<div className="">{chapter.title}</div>}>
							<>
								<Accordion showDivider={false}>
									{chapter.topics.map((topic, index) => (
										<AccordionItem
											key={index}
											className="bg-slate-100 rounded-md px-2"
											aria-label={topic.title}
											title={<div className="">{topic.title}</div>}>
											<Input>{topic.content}</Input>
										</AccordionItem>
									))}
								</Accordion>
								<div className="text-center">
									<Button onClick={() => handleAddLesson(index)}>Add Lesson</Button>
								</div>
							</>
						</AccordionItem>
					</Accordion>
				))}
			</div>
			<div className="text-center">
				<Button onClick={handleAddChapter}>Add Chapter</Button>
			</div>
		</div>
	)
}
