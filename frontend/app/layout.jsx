import './globals.css'
import { Providers } from './providers'

export const metadata = {
	metadataBase: new URL(process.env.METADATA_BASE_URL),
	title: 'E-Learning',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.png" sizes="any" />
			</head>
			<body className="min-h-screen bg-background text-default-700">
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
