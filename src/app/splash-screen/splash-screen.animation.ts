import { animate, keyframes, style, transition, trigger } from '@angular/animations';

// @WOLF359
export const splashTrigger = trigger('splash', [

	transition(':leave', [

		animate('500ms ease-out', keyframes([

			style({ opacity: '1' }),
			style({ opacity: '0' })

		]))

	])

]);
