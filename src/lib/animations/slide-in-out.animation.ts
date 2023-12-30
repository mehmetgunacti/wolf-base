import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideUpDownTrigger = trigger('slideUpDown', [

	state('closed', style({ height: '0px', visibility: 'hidden' })),
	state('opened', style({ height: '*', visibility: 'visible' })),

	transition('closed <=> opened', animate('300ms ease-in'))

]);

// trigger('slideUpDown', [

// 	transition(':enter', [

// 		// css styles at start of transition
// 		style({ height: 0, opacity: 0 }),

// 		// animation and styles at end of transition
// 		animate('300ms', style({ height: '*', opacity: 1 }))
// 	]),
// 	transition(':leave', [

// 		// css styles at start of transition
// 		style({ height: '*', opacity: 1, overflow: 'hidden' }),

// 		// animation and styles at end of transition
// 		animate('300ms', style({ height: 0, opacity: 0 }))
// 	])

// ]);
