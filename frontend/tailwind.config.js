/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			borderRadius: ['last'],
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			layout: {
				radius: {
					small: '0px',
					medium: '0px',
					large: '0px',
				},
			},
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: '#9e77e2',
							foreground: '#000000',
						},
						focus: '#9e77e2',
					},
				},
				light: {
					colors: {
						primary: {
							DEFAULT: '#9e77e2',
							foreground: '#000000',
						},
						focus: '#9e77e2',
					},
				},
			},
		}),
	],
}
