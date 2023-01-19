// @ANGULAR
import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';

// @WOLF359

// export const slideInOutTrigger = trigger('slideInOut', [
//     transition('false => true', [
//         query('false', [
//             style({ overflow: 'hidden' }),
//             animate(300, style({
//                 height: '*',
//                 opacity: '1'
//             }))
//         ], { optional: true })
//     ]),
//     transition('true => false', [
//         query('true', [
//             style({ overflow: 'visible' }),
//             animate(300, style({
//                 height: '0',
//                 opacity: '0'
//             }))
//         ], { optional: true })
//     ])
// ]);
// export const slideInOutTrigger = trigger('slideInOut', [
//     state('true', style({
//         // 'max-height': '0',
//         height: '0',
//         // opacity: '0',
//         overflow: 'hidden'
//     })),
//     state('false', style({
//         // 'max-height': '*',
//         height: '*',
//         // opacity: '1',
//         overflow: 'visible'
//     })),
//     transition('true => false', [
//         style({ overflow: 'hidden' }),
//         animate('300ms linear'),
//         style({ overflow: 'visible' })
//     ]),
//     transition('false => true', [
//         style({ overflow: 'hidden' }),
//         animate('300ms linear')
//     ])
// ]);

export const slideInOutTrigger = trigger('slideInOut', [
	transition(':enter', [

		// css styles at start of transition
		style({ width: 0, opacity: 0 }),

		// animation and styles at end of transition
		animate('300ms', style({ width: '*', opacity: 1 }))
	]),

	transition(':leave', [

		// css styles at start of transition
		style({ width: '*', opacity: 1 }),

		// animation and styles at end of transition
		animate('300ms', style({ width: 0, opacity: 0 }))
	])
]);

// export const slideInOutTrigger = trigger('slideInOut', [
//     state('true', style({
//         height: '*',
//         opacity: 1,
//     })),
//     state('false', style({
//         height: '0',
//         opacity: 0
//     })),
//     transition('true => false', [
//         animate('0.35s')
//     ]),
//     transition('false => true', [
//         animate('0.35s')
//     ])
// ])
