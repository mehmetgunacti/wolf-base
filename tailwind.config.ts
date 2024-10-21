import type { Config } from 'tailwindcss';

export default {

	content: [ "./src/**/*.{html,ts,scss}" ],
	theme: {

		colors: {

			black		: 'var(--col-black)',
			white		: 'var(--col-white)',
			transparent	: 'var(--col-transparent)',

			accent		: 'var(--col-accent)',
			focus		: 'var(--col-focus)',
			outline		: 'var(--col-outline)',
			disabled	: 'var(--col-disabled)',

			formElement: {

				DEFAULT	: 'var(--col-form-element)',
				text	: 'var(--col-form-element-text)',
				hover	: 'var(--col-form-element-hover)',
				active	: 'var(--col-form-element-active)',
				border	: 'var(--col-form-element-border)'

			},

			shadow		: 'var(--col-shadow)',

			scrollbar: {

				thumb	: 'var(--col-scrollbar-thumb)',
				track	: 'var(--col-scrollbar-track)'

			},

		},

		extend: {

			textColor: {

				base: {

					DEAFULT		: 'var(--col-text)',
					secondary	: 'var(--col-text-secondary)',
					disabled	: 'var(--col-disabled-text)',

				},
				primary	: 'var(--col-primary-text)',
				success	: 'var(--col-success-text)',
				info	: 'var(--col-info-text)',
				warn	: 'var(--col-warn-text)',
				error	: 'var(--col-error-text)',

			},
			backgroundColor: {

				header	: 'var(--col-bg-header)',
				nav		: 'var(--col-bg-nav)',
				popup	: 'var(--col-bg-popup)',
				page	: 'var(--col-bg-page)',
				overlay	: 'var(--col-bg-overlay)',

				component: {

					DEFAULT	: 'var(--col-bg-component)',
					hover	: 'var(--col-bg-component-hover)',
					active	: 'var(--col-bg-component-active)'

				},

				componentDark: {

					DEFAULT	: 'var(--col-bg-component-dark)',
					hover	: 'var(--col-bg-component-dark-hover)',
					active	: 'var(--col-bg-component-dark-active)'

				},

				primary: {

					DEFAULT	: 'var(--col-primary)',
					hover	: 'var(--col-primary-hover)',
					active	: 'var(--col-primary-active)'

				},

				success: {

					DEFAULT	: 'var(--col-success)',
					hover	: 'var(--col-success-hover)',
					active	: 'var(--col-success-active)'

				},

				info: {

					DEFAULT	: 'var(--col-info)',
					hover	: 'var(--col-info-hover)',
					active	: 'var(--col-info-active)'

				},

				warn: {

					DEFAULT	: 'var(--col-warn)',
					hover	: 'var(--col-warn-hover)',
					active	: 'var(--col-warn-active)'

				},

				error: {

					DEFAULT	: 'var(--col-error)',
					hover	: 'var(--col-error-hover)',
					active	: 'var(--col-error-active)'

				},

				ghost	: {

					hover	: 'var(--col-hover)',
					active	: 'var(--col-active)'

				},

			},

			borderColor: {

				primary	: 'var(--col-primary-border)',
				success	: 'var(--col-success-border)',
				info	: 'var(--col-info-border)',
				warn	: 'var(--col-warn-border)',
				error	: 'var(--col-error-border)'

			},

			boxShadow: {
				'3xl': '0 35px 60px -15px var(--col-shadow)',
			}

		},

	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/typography')
	],

} satisfies Config

