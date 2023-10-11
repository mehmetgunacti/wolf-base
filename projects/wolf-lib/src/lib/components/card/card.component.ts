import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'w-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
}
