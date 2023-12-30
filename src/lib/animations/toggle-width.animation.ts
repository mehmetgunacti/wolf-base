// @ANGULAR
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

// @WOLF359

export const toggleWidthTrigger = trigger('toggleWidth', [
	state('collapsed, true, void', style({
		width: '0',
		opacity: '0',
		overflow: 'hidden'
	})),
	state('expanded, false', style({
		width: '*',
		opacity: '1',
		overflow: 'visible'
	})),
	transition('true => false, collapsed => expanded', [
		animate('300ms ease-out', keyframes([
			style({ opacity: '1' }),
			style({ width: '*' }),
			style({ overflow: 'visible' })
		]))
	]),
	transition('false => true, expanded => collapsed', [
		animate('300ms ease-out', keyframes([
			style({ overflow: 'hidden' }),
			style({ width: '0' })
		]))
	])
]);
