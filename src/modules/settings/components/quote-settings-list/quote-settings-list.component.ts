import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Quote, UUID } from '@lib';

@Component({
	selector: 'app-quote-settings-list',
	templateUrl: './quote-settings-list.component.html',
	styleUrls: ['./quote-settings-list.component.scss'],
	host: { 'class': 'd-flex-column p' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsListComponent {

	quotes: InputSignal<Quote[]> = input.required();
	fcSearch: FormControl<string | null>;

	@Output() select: EventEmitter<UUID> = new EventEmitter();
	search = output<string>();

	constructor() {

		this.fcSearch = new FormControl('');
		this.fcSearch.valueChanges.pipe(
			takeUntilDestroyed()
		).subscribe(
			term => this.search.emit(term ?? '')
		)

	}

	onSelect(quote: Quote): void {

		this.select.emit(quote.id);

	}

}
