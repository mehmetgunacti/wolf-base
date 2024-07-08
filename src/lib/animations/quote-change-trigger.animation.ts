import { animate, state, style, transition, trigger } from '@angular/animations';

export const quoteChangeTrigger = trigger('quoteChange', [

	state('void', style({ opacity: 0 })),
	transition('* => *', [

		style({ opacity: 0 }),
		animate('1000ms', style({ opacity: 1 }))

	])

]);

export const lazyFadeIn = trigger('lazyFadeIn', [

	transition('* => *', [

		style({ opacity: 0 }),
		animate('{{delay}}ms', style({ opacity: 1 }))

	], { params: { delay: 100 } })

]);
