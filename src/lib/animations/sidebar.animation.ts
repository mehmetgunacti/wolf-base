import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { sidebarConf } from 'lib/constants';

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
	transition('full => hidden', [animate(duration)]), // on click
	transition('half => full', [animate(duration)]), // on click
	transition('bigHidden => bigHalf', [animate(duration)]), // on click
	transition('hidden => full', [animate(duration)]), // on click
	transition('bigHalf => bigFull', [animate(duration)]), // on click
	transition('bigFull => bigHidden', [animate(duration, keyframes([style({ left: (offset - width_full) + unit, width: width_full + unit })]))]), // on click

	// window resize
	transition('half => bigHalf', [style({ left: (offset - width_half) + unit, width: width_half + unit }), animate(duration)]), // on resize
	transition('full => bigFull', [animate(duration)]), // on resize
	transition('hidden => bigHidden', [animate(duration)]), // on resize
	transition('bigFull => full', [animate(duration)]), // on resize
	transition('bigHalf => half', [animate(duration, keyframes([style({ left: (offset - width_half) + unit, width: width_half + unit })]))]), // on resize
	transition('bigHidden => hidden', [animate(duration)]), // on resize

])
