import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideDownTrigger = trigger('slideDown', [

	state('false', style({ height: '0px' })),
	state('true', style({ height: '*' })),

	transition('false <=> true', animate('300ms'))

]);
