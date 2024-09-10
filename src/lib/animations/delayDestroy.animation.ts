import { animate, style, transition, trigger } from '@angular/animations';

export const delayDestroyTrigger = trigger('delayDestroy', [

	transition(':leave', [

		style({})

	], { delay: 2000 })

]);
