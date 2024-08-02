import { animate, style, transition, trigger } from '@angular/animations';

// export const fadeInFadeOutTrigger = trigger('fadeInFadeOut', [
// 	transition(':enter', [
// 		style({	opacity: '0' }),
// 		animate('.5s ease-out', style({ opacity: '1' })),
// 	]),
// 	transition(':leave', [
// 		style({ opacity: '1' }),
// 		animate('.5s ease-out', style({ opacity: '0' }))
// 	])
// ]);


export const fadeInFadeOutTrigger = trigger('fadeInFadeOut', [
	transition(':enter', [
		style({
			opacity: 0,
			transform: 'scale(0.8)'
		}),
		animate('0.5s ease-in-out', style({
			opacity: 1,
			transform: 'scale(1)'
		}))
	]),
	transition(':leave', [
		style({
			opacity: 1,
			transform: 'scale(1)'
		}),
		animate('0.5s ease-in-out', style({
			opacity: 0,
			transform: 'scale(0.8)'
		}))
	])
]);
