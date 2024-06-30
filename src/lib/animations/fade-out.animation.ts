import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const fadeOutTrigger = trigger('fadeOut', [

	transition(':leave', [

		animate('500ms ease-out', keyframes([

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
