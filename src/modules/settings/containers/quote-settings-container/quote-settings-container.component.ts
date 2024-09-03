import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppEntityType, Quote, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import * as entityActions from 'store/actions/entity.actions';
import { setSelectedId } from 'store/actions/quote.actions';
import { selQuote_EntityList } from 'store/selectors/entity-selectors/entity-quote.selectors';
import { selQuoteSettings_selected } from 'store/selectors/quote-selectors/quote-settings.selectors';

@Component({
	selector: 'app-quote-settings-container',
	templateUrl: './quote-settings-container.component.html',
	styleUrls: ['./quote-settings-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsContainerComponent {

	private search: Subject<string> = new BehaviorSubject<string>('');
	private store: Store = inject(Store);

	quotes$: Observable<Quote[]> = combineLatest([
		this.store.select(selQuote_EntityList),
		this.search.asObservable()
	]).pipe(

		map(([quotes, searchTerm]) => {

			if (searchTerm)
				return quotes.filter(quote => quote.name.includes(searchTerm));
			return quotes;

		})

	);
	selected$: Observable<Quote | null> = this.store.select(selQuoteSettings_selected);

	onSearch(term: string): void {

		console.log(term);
		this.search.next(term);

	}

	onCreate(quote: Partial<Quote>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.quote, entity: quote }));

	}

	onUpdate(quote: Quote): void {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.quote, id: quote.id, entity: quote }));

	}

	onSelected(id: UUID): void {

		this.store.dispatch(setSelectedId({ id }));

	}

	onDelete(id: UUID): void {

		this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.quote, id }));

	}

	onReset(): void {

		this.store.dispatch(setSelectedId({ id: null }));

	}

}
