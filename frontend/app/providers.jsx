'use client'
import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ToastProvider } from '@/providers/ToastProvider'
import store from '../redux/store'
import { Provider } from 'react-redux'

export function Providers({ children, themeProps }) {
	const router = useRouter()
	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
				<Provider store={store}>
					<main>
						{children}
						<ToastProvider />
					</main>
				</Provider>
			</NextThemesProvider>
		</NextUIProvider>
	)
}
