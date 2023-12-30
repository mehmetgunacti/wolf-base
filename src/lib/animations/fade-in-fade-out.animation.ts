import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInFadeOutTrigger = trigger('fadeInFadeOut', [
	transition(':enter', [
		style({
			opacity: '0',
			height: '0'
		}),
		animate('.5s ease-out', style({
			opacity: '1',
			height: '*',
		})),
	]),
	transition(':leave', [
		style({
			height: '*',
			opacity: '1',
			transform: 'translateY(0)'
		}),
		animate('.5s ease-out', style({
			height: '0',
			opacity: '0',
			transform: 'translateY(-70%)'
		}))
	])
]);
