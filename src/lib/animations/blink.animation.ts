import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const blinkTrigger = trigger('blink', [

	transition('false => true', [

		animate(

			'1s',
			keyframes([
				style({ backgroundColor: '{{color}}', offset: 0 }),
				style({ backgroundColor: '*', offset: 0.2 }),
				style({ backgroundColor: '{{color}}', offset: 0.25 }),
				style({ backgroundColor: '*', offset: 0.45 }),
				style({ backgroundColor: '{{color}}', offset: 0.5 }),
				style({ backgroundColor: '*', offset: 0.7 }),
				style({ backgroundColor: '{{color}}', offset: 0.75 }),
				style({ backgroundColor: '*', offset: 0.95 })
			]),

		)

	], { params: { color: undefined } }),

]);
