import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Quote, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { create, moveToTrash, setSelectedId, update } from 'store/actions/quote.actions';
import { selQuote_array } from 'store/selectors/quote-selectors/quote-entities.selectors';
import { selQuoteSettings_selected } from 'store/selectors/quote-selectors/quote-settings.selectors';

@Component({
	selector: 'app-quote-settings-container',
	templateUrl: './quote-settings-container.component.html',
	styleUrls: ['./quote-settings-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsContainerComponent {

	private store: Store = inject(Store);

	quotes$: Observable<Quote[]> = this.store.select(selQuote_array);
	selected$: Observable<Quote | null> = this.store.select(selQuoteSettings_selected);

	onCreate(quote: Partial<Quote>): void {

		this.store.dispatch(create({ quote }));

	}

	onUpdate(quote: Quote): void {

		this.store.dispatch(update({ id: quote.id, quote }));

	}

	onSelected(id: UUID): void {

		this.store.dispatch(setSelectedId({ id }));

	}

	onDelete(id: UUID): void {

		this.store.dispatch(moveToTrash({ id }));

	}

	onReset(): void {

		this.store.dispatch(setSelectedId({ id: null }));

	}

}
