import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const fadeInTrigger = trigger('fadeIn', [

	transition(':enter', [

		animate('500ms ease-out', keyframes([

			style({ opacity: '0' }),
			style({ opacity: '1' })

		]))

	])

]);

export const fadeOutTrigger = trigger('fadeOut', [

	transition(':leave', [

		animate('200ms ease-out', keyframes([

			style({ opacity: '1' }),
			style({ opacity: '0' })

		]))

	])

]);

export const onEnterFadeOutTrigger = trigger('fadeOut', [

	transition(':enter', [

		animate('1000ms ease-out', keyframes([

			style({ opacity: '1' }),
			style({ opacity: '0' })

		]))

	])

]);
