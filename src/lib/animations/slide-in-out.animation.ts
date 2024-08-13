import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideUpDownTrigger = trigger('slideUpDown', [

	state('closed', style({ height: '0px', visibility: 'hidden', opacity: 0 })),
	state('opened', style({ height: '*', visibility: 'visible', opacity: 1 })),

	transition('closed <=> opened', animate('300ms ease-in'))

]);

export const slideChoicesTrigger = trigger('slideChoices', [

	state('closed', style({ height: '0px', visibility: 'hidden', opacity: 0, paddingTop: 0 })),
	state('opened', style({ height: '*', visibility: 'visible', opacity: 1 })),

	transition('closed <=> opened', animate('300ms ease-in'))

]);

export const slideDown = trigger('slideDown', [

	transition(':enter', [

		// css styles at start of transition
		style({ height: 0, opacity: 0, overflow: 'hidden' }),

		// animation and styles at end of transition
		animate('300ms', style({ height: '*', opacity: 1})), // , overflow: 'visible' })),

		// style({ overflow: 'hidden' })

	]),
	transition(':leave', [

		// css styles at start of transition
		style({ height: '*', opacity: 1, overflow: 'hidden' }),

		// animation and styles at end of transition
		animate('300ms', style({ height: 0, opacity: 0})), // , overflow: 'hidden' })),


		//style({ overflow: 'visible' })

	])

]);
