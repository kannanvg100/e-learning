'use client'
import React from 'react'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { ScrollShadow } from '@nextui-org/react'
import Header from '@/components/Header'

export default function layout({ children }) {
	return (
		<>
			<div className="flex min-h-screen">
				<div className="w-[220px] self-stretch">
					<Sidebar />
				</div>
				<div className="flex-grow">
					<div className="min-h-screen p-2">
						<div className="flex">
							<p className="flex-grow">My courses</p>
							<Header />
						</div>
						{children}
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
