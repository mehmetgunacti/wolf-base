import { animate, state, style, transition, trigger } from '@angular/animations';

export const upsideDownTrigger = trigger('upsideDown', [

	state('false', style({ transform: 'rotate(0deg)' })),
	state('true', style({ transform: 'rotate(180deg)' })),
	transition('false <=> true', animate('500ms ease-in-out'))

]);
