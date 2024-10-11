import type { Config } from 'tailwindcss'

export default {
	content: [],
	//darkMode: ['selector', '[data-mode="dark"]'],
	theme: {
		colors: {

			'tahiti': {
				light: '#67e8f9',
				DEFAULT: '#06b6d4',
				dark: '#0e7490',
			},
			primary: {
				DEFAULT		: 'hsl(var(--col-primary))',
				'text'		: 'hsl(var(--col-primary-text))',
				'hover'		: 'hsl(var(--col-primary-hover))',
				'active'	: 'hsl(var(--col-primary-active))',
				'border'	: 'hsl(var(--col-primary-border))'
			},
			secondary: 'hsl(var(--color-secondary))',

		},
		extend: {},
	},
	plugins: [
		// require('@tailwindcss/typography')

	],
} satisfies Config
