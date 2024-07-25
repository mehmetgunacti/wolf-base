import { animate, style, transition, trigger } from '@angular/animations';

export const quoteHeightTrigger = trigger('quoteHeight', [

	transition(

		'* => *',
		[

			style({height: '{{startHeight}}px' }),
			animate('1s', style({ height: '*' }))

		],
		{ params: { startHeight: '0' } }

	),

])
