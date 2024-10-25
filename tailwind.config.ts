import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {

	content: [ "./src/**/*.{html,ts,scss}" ],
	theme: {

		colors: {

			black		: 'var(--col-black)',
			white		: 'var(--col-white)',
			transparent	: 'var(--col-transparent)',

			accent		: {

				DEFAULT	: 'var(--col-accent)',
				hover	: 'var(--col-accent-hover)',
				active	: 'var(--col-accent-active)'

			},
			focus		: 'var(--col-focus)',
			outline		: 'var(--col-outline)',
			disabled	: 'var(--col-disabled)',
			content		: 'var(--col-text)',

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

			fontFamily: {

				nunito	: 'var(--font-family-nunito)',
				mono	: 'var(--font-family-mono)',

			},

			textColor: {

				base: {

					DEFAULT		: 'var(--col-text)',
					secondary	: 'var(--col-text-secondary)',
					disabled	: 'var(--col-disabled-text)',

				},
				primary	: 'var(--col-primary-text)',
				success	: 'var(--col-success-text)',
				info	: 'var(--col-info-text)',
				warn	: 'var(--col-warn-text)',
				error	: 'var(--col-error-text)',
				ghost	: 'var(--col-ghost-text)',

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

				'component-dark': {

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

				ghost: {

					DEFAULT	: 'var(--col-ghost)',
					hover	: 'var(--col-ghost-hover)',
					active	: 'var(--col-ghost-active)'

				},

			},

			borderColor: {

				primary	: 'var(--col-primary-border)',
				success	: 'var(--col-success-border)',
				info	: 'var(--col-info-border)',
				warn	: 'var(--col-warn-border)',
				error	: 'var(--col-error-border)',
				ghost	: 'var(--col-ghost-border)',

			},

			fill: {

				base: {

					DEFAULT		: 'var(--col-text)',
					secondary	: 'var(--col-text-secondary)',
					disabled	: 'var(--col-disabled-text)',

				},

			},

			boxShadow: {

				'3xl'		: '0 35px 60px -15px var(--col-shadow)',
				'component'	: 'var(--shadow-component)',

			},// defaultTheme

			spacing: {

				'header'			: 'var(--header-height)',
				'nav-full'			: 'var(--nav-full)',
				'nav-half'			: 'var(--nav-half)',
				'nav-glyph-width'	: `calc(var(--nav-half) - 2 * ${defaultTheme.spacing['2']})`,
				'nav-content-width'	: `calc(var(--nav-full) - var(--nav-half) - ${defaultTheme.spacing['2']})`

			},

			tabSize: {

				'4': '4'

			},

			height: {

				'100dvh'	: '100dvh',
				'main'		: 'calc(100dvh - var(--header-height))'

			},

			zIndex: {

				'splash-screen'		: '9000',
				'ng-progress'		: '8000',
				'overlay-container'	: '7000',
				'overlay'			: '7000',
				'overlay-backdrop'	: '7000',
				'header'			: '6000',
				'nav-left'			: '5200',
				'nav-content'		: '5100',
				'nav'				: '5000',
				'nav-overlay'		: '4000',
				'main'				: '3000',
				'bookmark-overlay'	: '2000',
				'croppie-close-btn'	: '1000',

			}

		},

	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/typography')
	],

} satisfies Config

