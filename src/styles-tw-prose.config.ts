import type { Config } from 'tailwindcss';

export default {

	content: [ "./src/**/*.{html,ts,scss}" ],
	theme: {

		extend: {

			typography: () => ({

				DEFAULT: {

					css: {

						'--tw-prose-body'			: 'var(--color-text)',
						'--tw-prose-headings'		: 'var(--color-accent-text)',
						'--tw-prose-lead'			: 'var(--color-text)',
						'--tw-prose-links'			: 'var(--color-accent-text)',
						'--tw-prose-bold'			: 'var(--color-accent-text)',
						'--tw-prose-counters'		: 'var(--color-text-secondary)',
						'--tw-prose-bullets'		: 'var(--color-text-secondary)',
						'--tw-prose-hr'				: 'var(--color-text-secondary)',
						'--tw-prose-quotes'			: 'var(--color-text)',
						'--tw-prose-quote-borders'	: 'var(--color-text-secondary)',
						'--tw-prose-captions'		: 'var(--color-text)',
						'--tw-prose-code'			: 'var(--color-text)',
						'--tw-prose-pre-code'		: 'var(--color-text)',
						'--tw-prose-pre-bg'			: 'var(--color-component-dark)',
						'--tw-prose-th-borders'		: 'var(--color-text-secondary)',
						'--tw-prose-td-borders'		: 'var(--color-text-secondary)',

						mark: {

							'color'				: 'var(--color-text)',
							'background-color'	: 'var(--color-focus)',
							'padding'			: '.2em .4em',
							'font-weight'		: 'bold',
							'border-radius'		: '6px'

						},

						'.table-of-contents': {

							ul: {

								'list-style-type': 'none'

							},
							a: {

								'color'				: 'var(--text-color)',
								'text-decoration'	: 'none',
								'padding'			: '4px',
								'&:hover'			: {
									'text-decoration': 'underline',
								},
								'&:focus-visible'	: {

									'border-radius'				: '6px',
									'outline'					: '2px solid transparent',
									'outline-offset'			: '4px',
									'--tw-ring-offset-shadow'	: 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
									'--tw-ring-shadow'			: 'var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
									'box-shadow'				: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
									'--tw-ring-color'			: 'var(--color-outline)'

								}

							}

						},
						'pre': {

							'code': {

								'padding': '0'

							}

						}

					}

				}

			})

		},

	},
	plugins: [
		require('@tailwindcss/typography')
	],

} satisfies Config
