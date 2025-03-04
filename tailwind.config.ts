import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';
import { DEFAULT_CONFIG } from '@libServices/overlay.service';

export default {

	content: [ "./src/**/*.{html,ts,scss}" ],
	theme: {

		colors: {

			black		: 'var(--col-black)',
			white		: 'var(--col-white)',
			transparent	: 'var(--col-transparent)',

			accent		: {

				DEFAULT	: 'var(--col-accent)',
				text	: 'var(--col-accent-text)',
				hover	: 'var(--col-accent-hover)',
				active	: 'var(--col-accent-active)'

			},
			focus		: 'var(--col-focus)',
			progress	: {

				DEFAULT : 'var(--col-progress)',
				bg		: 'var(--col-progress-bg)'

			},
			outline		: 'var(--col-outline)',
			disabled	: {

				DEFAULT	: 'var(--col-disabled)',
				text	: 'var(--col-disabled-text)'

			},
			content		: 'var(--col-text)',
			secondary	: 'var(--col-text-secondary)',
			primary		: 'var(--col-primary)',
			success		: 'var(--col-success)',
			info		: 'var(--col-info)',
			warn		: 'var(--col-warn)',
			error		: 'var(--col-error)',

			'form-element': {

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

			animation: {
				'loading': 'loading 1.5s linear infinite'
			},

			keyframes: {
				loading: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(200%)' }
				}
			},

			fontFamily: {

				nunito	: 'var(--font-family-nunito)',
				mono	: 'var(--font-family-mono)',

			},

			fontSize: {

				xs: '0.8rem',
				'2xs': '0.7rem',
				'3xs': '0.6rem',
				'4xs': '0.5rem'

			},

			textColor: {

				'base-color': {

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

				header		: 'var(--col-bg-header)',
				nav			: 'var(--col-bg-nav)',
				popup		: 'var(--col-bg-popup)',
				page		: 'var(--col-bg-page)',
				overlay		: 'var(--col-bg-overlay)',

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

				primary		: 'var(--col-primary-border)',
				success		: 'var(--col-success-border)',
				info		: 'var(--col-info-border)',
				warn		: 'var(--col-warn-border)',
				error		: 'var(--col-error-border)',
				ghost		: 'var(--col-ghost-border)',
				secondary	: 'var(--col-text-secondary)',
				'ghost-hover' : 'var(--col-ghost-hover)'

			},

			fill: {

				base: {

					DEFAULT		: 'var(--col-text)',
					secondary	: 'var(--col-text-secondary)',
					disabled	: 'var(--col-disabled-text)',

				},
				primary	: 'var(--col-primary)',
				success	: 'var(--col-success)',
				info	: 'var(--col-info)',
				warn	: 'var(--col-warn)',
				error	: 'var(--col-error)',

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
				'nav-content-width'	: `calc(var(--nav-full) - var(--nav-half) - ${defaultTheme.spacing['2']})`,
				'widget-height'		: 'var(--widget-height)',
				'widget-height-sm'	: 'var(--widget-height-sm)',
				'button-height'		: 'var(--button-height)',
				'button-height-sm'	: 'var(--button-height-sm)',
				'button-height-xs'	: 'var(--button-height-xs)',
				'button-height-2xs'	: 'var(--button-height-2xs)',

			},

			height: {

				'100dvh'	: '100dvh',
				'main'		: 'calc(100dvh - var(--header-height))'

			},

			zIndex: {

				'splash-screen'		: '10000',
				'progress'			: '9000',
				'header'			: '8000',
				'overlay-container'	: '7000',
				'overlay'			: '7000',
				'overlay-backdrop'	: '7000',
				'nav-left'			: '5200',
				'nav-content'		: '5100',
				'nav'				: '5000',
				'nav-overlay'		: '4000',
				'main'				: '3000',
				'bookmark-overlay'	: '2000',
				'croppie-close-btn'	: '1000',

			},

			typography: () => ({

				DEFAULT: {

					css: {

						'--tw-prose-body': 'var(--col-text)',
						'--tw-prose-headings': 'var(--col-accent-text)',
						'--tw-prose-lead': 'var(--col-text)',
						'--tw-prose-links': 'var(--col-accent-text)',
						'--tw-prose-bold': 'var(--col-accent-text)',
						'--tw-prose-counters': 'var(--col-text-secondary)',
						'--tw-prose-bullets': 'var(--col-text-secondary)',
						'--tw-prose-hr': 'var(--col-text-secondary)',
						'--tw-prose-quotes': 'var(--col-text)',
						'--tw-prose-quote-borders': 'var(--col-text-secondary)',
						'--tw-prose-captions': 'var(--col-text)',
						'--tw-prose-code': 'var(--col-text)',
						'--tw-prose-pre-code': 'var(--col-text)',
						'--tw-prose-pre-bg': 'var(--col-bg-component-dark)',
						'--tw-prose-th-borders': 'var(--col-text-secondary)',
						'--tw-prose-td-borders': 'var(--col-text-secondary)',

						mark: {

							'color': 'var(--col-text)',
							'background-color': 'var(--col-focus)',
							'padding': '.2em .4em',
							'font-weight': 'bold',
							'border-radius': '6px'

						},

						'.table-of-contents': {

							ul: {

								'list-style-type': 'none'

							},
							a: {

								'color': 'var(--text-color)',
								'text-decoration': 'none',
								'padding': '4px',
								'&:hover': {
									'text-decoration': 'underline',
								},
								'&:focus-visible': {

									'border-radius': '6px',
									'outline': '2px solid transparent',
									'outline-offset': '4px',
									'--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
									'--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
									'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
									'--tw-ring-color': 'var(--col-outline)'

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
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/typography'),
		plugin(function({addVariant}) {

			addVariant("starting", "@starting-style");

		})
	],

} satisfies Config

