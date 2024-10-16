import type { Config } from 'tailwindcss';

export default {
	content: [ "./src/**/*.{html,ts,scss}" ],
	theme: {
		extend: {
			boxShadow: {
				'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
			}
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/typography')
	],
} satisfies Config

