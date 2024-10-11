import { animate, style, transition, trigger } from '@angular/animations';

export const delayDestroyTrigger = trigger('delayDestroy', [

	transition(':leave', [

		style({}),
		animate('{{duration}}', style({}))

	], { params: { duration: '2s' } })

]);
