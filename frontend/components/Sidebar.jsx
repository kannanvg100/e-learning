import { removeUser } from '@/redux/slices/userSlice'
import { useLazyLogoutQuery } from '@/redux/slices/usersApiSlice'
import { Spacer } from '@nextui-org/react'
import { BookOpenText, GraduationCap, Home, LifeBuoy, LogOut, Settings, Space, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Sidebar() {
	const pathname = usePathname()
	const [logoutUser, { isError }] = useLazyLogoutQuery()
	const dispatch = useDispatch()
    const router = useRouter()
	const isActive = (path) => {
		if (path === '/home') return pathname === '/' ? 'text-primary font-medium bg-slate-200' : ''
		return pathname.startsWith(path) ? 'text-primary font-medium bg-slate-200' : ''
	}
	const handleLogout = async () => {
		try {
			const res = await logoutUser()
			if (res.error) return toast.error('Error occured')
			dispatch(removeUser())
			router.replace('/login')
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}
	return (
		<div className="w-[200px] bg-slate-200 *:block p-4 h-full flex flex-col justify-between">
			<div>
				<Link href="/">
					<div className="flex items-center gap-2 m-2 text-[#9e77e2]">
						<GraduationCap size={20} />
						<span>LOGO</span>
					</div>
				</Link>
				<Spacer y={4} />
				<Link href="/">
					<div className={`flex items-center gap-2 m-2 ${isActive('/home')}`}>
						<Home size={14} />
						<span>Home</span>
					</div>
				</Link>
				<Link href="/courses">
					<div className={`flex items-center gap-2 m-2 ${isActive('/courses')}`}>
						<BookOpenText size={14} />
						<span>My Courses</span>
					</div>
				</Link>
				<Link href="/courses">
					<div className={`flex items-center gap-2 m-2 ${isActive('/settings')}`}>
						<Settings size={14} />
						<span>Settings</span>
					</div>
				</Link>
				<Link href="/courses">
					<div className={`flex items-center gap-2 m-2 ${isActive('/profile')}`}>
						<User size={14} />
						<span>Profile</span>
					</div>
				</Link>
			</div>
			<div>
				<div className={`flex items-center gap-2 m-2 ${isActive('/profile')}`}>
					<LifeBuoy size={14} />
					<span>Help</span>
				</div>
				<div className={`flex items-center gap-2 m-2`} onClick={handleLogout}>
					<LogOut size={14} />
					<span>Logout</span>
				</div>
			</div>
		</div>
	)
}
