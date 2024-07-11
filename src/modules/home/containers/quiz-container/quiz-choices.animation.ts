import { animate, style, transition, trigger } from '@angular/animations';

export const quizChoicesTrigger = trigger('quizChoices', [
	transition(':enter', [
		style({
			opacity: '0',
			height: '0',
			transform: 'translateY(40%)'
		}),
		animate('.5s ease-out', style({
			opacity: '1',
			height: '*',
			transform: 'translateY(0)'
		})),
	]),
	transition(':leave', [
		style({
			height: '*',
			opacity: '1'
		}),
		animate('.5s ease-out', style({
			height: '0',
			opacity: '0',
			transform: 'translateY(40%)'
		}))
	])
]);
