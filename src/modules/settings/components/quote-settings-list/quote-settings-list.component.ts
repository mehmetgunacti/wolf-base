import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { Quote, UUID } from '@lib';

@Component({
	selector: 'app-quote-settings-list',
	templateUrl: './quote-settings-list.component.html',
	styleUrls: ['./quote-settings-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsListComponent {

	quotes: InputSignal<Quote[]> = input.required();

	@Output() select: EventEmitter<UUID> = new EventEmitter();

	onSelect(quote: Quote): void {

		this.select.emit(quote.id);

	}

}
