import { animate, style, transition, trigger } from '@angular/animations';
import { sidebarConf } from '@constants';

// default duration hard-coded to sidebar duration
const { duration } = sidebarConf;

export const opacityTrigger = trigger('opacity', [

	transition(':enter', [

		style({ opacity: '0' }),
		animate(duration + ' ease-out', style({ opacity: '1' })),

	], { params: { duration } }),

	transition(':leave', [

		style({ opacity: '1' }),
		animate(duration + ' ease-out', style({ opacity: '0' }))

	], { params: { duration } })

]);
