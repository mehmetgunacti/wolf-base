import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';

const timing = '1.5s';
export const choicesBlinkTrigger = trigger('choicesBlink', [

	state('inactive', style({})),
	state('active', style({})),
	transition('inactive => active', [

		group([

			// Animation for correct choice
			query('[quiz_choice].correct', [

				animate(

					timing,
					keyframes([

						style({ backgroundColor: 'var(--color-success)' }),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-success)' }),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-success)' })

					]),

				)

			], { optional: true }),

			// Animation for incorrect choice
			query('[quiz_choice].incorrect', [

				animate(

					timing,
					keyframes([

						style({ backgroundColor: 'var(--color-error)' }),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-error)' }),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-error)' })

					]),

				)

			], { optional: true })

		])

	])

]);
