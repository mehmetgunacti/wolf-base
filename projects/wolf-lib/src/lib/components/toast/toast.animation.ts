import { animate, state, style, transition, trigger } from '@angular/animations';

export const toastTrigger = trigger('animateToast', [

	transition(':enter', [
		style({
			transform: 'translateX(100%)', // Start off-screen to the right
			opacity: 0
		}),
		animate(
			'500ms ease-out',
			style({
				transform: 'translateX(0)',
				opacity: 1
			})
		), // Slide in
	]),
	transition(':leave', [
		animate(
			'500ms ease-in',
			style({
				transform: 'translateX(100%)', // Slide out to the top
				height: 0, // Collapse height on exit
				margin: 0, // Remove margin on exit
				padding: 0, // Remove padding on exit
				opacity: 0, // Fade out on exit
			})
		),
	])

]);