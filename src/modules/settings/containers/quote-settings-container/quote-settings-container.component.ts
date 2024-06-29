import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Quote } from '@lib';
import { Store } from '@ngrx/store';
import { create, update } from 'store/actions/quote.actions';

@Component({
	selector: 'app-quote-settings-container',
	templateUrl: './quote-settings-container.component.html',
	styleUrls: ['./quote-settings-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsContainerComponent {

	private store: Store = inject(Store);

	onSave(quote: Partial<Quote>): void {

		if (quote.id)
			this.store.dispatch(update({ id: quote.id, quote }));
		else
			this.store.dispatch(create({ quote }));

	}

}
