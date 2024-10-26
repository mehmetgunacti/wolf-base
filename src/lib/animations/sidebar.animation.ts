import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { sidebarConf } from '@constants';

const {

	offset,
	width_half,
	width_full,
	duration,
	unit

} = sidebarConf;

export const sidebarTrigger = trigger('sidebar', [

	state('full', style({ left: offset + unit, width: width_full + unit })),
	state('half', style({ left: (offset - width_full) + unit, width: width_full + unit })),
	state('hidden', style({ left: (offset - width_full) + unit, width: width_full + unit })),
	state('bigFull', style({ left: offset + unit, width: width_full + unit })),
	state('bigHalf', style({ left: offset + unit, width: width_half + unit })),
	state('bigHidden', style({ left: (offset - width_half) + unit, width: width_half + unit })),

	// nav button (hamburger) click
	transition('bigFull => bigHidden', [animate(duration, keyframes([style({ left: (offset - width_full) + unit, width: width_full + unit })]))]), // on click

	// window resize
	transition('half => bigHalf', [style({ left: (offset - width_half) + unit, width: width_half + unit }), animate(duration)]), // on resize
	transition('bigHalf => half', [animate(duration, keyframes([style({ left: (offset - width_half) + unit, width: width_half + unit })]))]), // on resize

	// all other transitions
	transition('* => *', [animate(duration)]),

])

export const mainTrigger = trigger('main', [

	state('full', style({ left: offset + unit })),
	state('half', style({ left: offset + unit })),
	state('hidden', style({ left: offset + unit })),
	state('bigFull', style({ left: offset + width_full + unit })),
	state('bigHalf', style({ left: offset + width_half + unit })),
	state('bigHidden', style({ left: offset + unit })),

	// all other transitions
	transition('* => *', [animate(duration)]),

])
