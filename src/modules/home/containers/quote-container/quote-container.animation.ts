import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';

export const quoteHeightTrigger = trigger('quoteHeight', [

	transition(

		'incoming => outgoing',
		[
			style({ color: '*' }),
			animate('1s', style({ color: 'transparent', height: '{{startHeight}}px' }))
		]

	),
	transition(

		'outgoing => incoming',
		[
			style({ color: 'transparent' }),
			animate('1s', style({ color: '*', height: '*' }))
		],
		{ params: { startHeight: '0' } }

	)

])


// export const quoteHeightTrigger = trigger('quoteHeight', [

// 	transition(

// 		'* => *',
// 		[

// 			style({height: '{{startHeight}}px' }),
// 			animate('1s', style({ height: '*' }))

// 		],
// 		{ params: { startHeight: '0' } }

// 	),

// ])
