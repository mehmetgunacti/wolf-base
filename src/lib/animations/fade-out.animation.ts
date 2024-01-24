import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const fadeOutTrigger = trigger('fadeOut', [

	transition(':leave', [

		animate('500ms ease-out', keyframes([

			style({ opacity: '1' }),
			style({ opacity: '0' })

		]))

	])

]);
