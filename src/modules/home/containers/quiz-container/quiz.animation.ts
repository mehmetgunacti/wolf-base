import { trigger, state, style, animate, transition, group, query, keyframes } from '@angular/animations';

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

						style({ backgroundColor: 'var(--color-green)' }),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-green)'}),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-green)' })

					]),

				)

			], { optional: true }),

			// Animation for incorrect choice
			query('[quiz_choice].incorrect', [

				animate(

					timing,
					keyframes([

						style({ backgroundColor: 'var(--color-red)' }),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-red)' }),
						style({ backgroundColor: '*' }),
						style({ backgroundColor: 'var(--color-red)' })

					]),

				)

			], { optional: true })

		])

	])

]);
