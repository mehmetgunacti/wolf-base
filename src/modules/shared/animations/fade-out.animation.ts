import { animate, keyframes, style, transition, trigger } from '@angular/animations';

// @WOLF359
export const fadeOutTrigger = trigger('fadeOut', [

    transition(':leave', [

        animate('400ms ease-out', keyframes([

            style({ opacity: '1' }),
            style({ opacity: '0' })

        ]))

    ])

]);
