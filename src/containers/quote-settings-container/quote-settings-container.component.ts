import { entityActions, quoteActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuoteSettingsFormComponent, QuoteSettingsListComponent } from '@components';
import { AppEntityType, UUID } from '@constants';
import { Quote } from '@models';
import { Store } from '@ngrx/store';
import { selQuote_EntityList, selQuoteSettings_selected } from '@selectors';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';

@Component({
	standalone: true,
	imports: [ QuoteSettingsFormComponent, QuoteSettingsListComponent, AsyncPipe ],
	selector: 'app-quote-settings-container',
	templateUrl: './quote-settings-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsContainerComponent {

	private search: Subject<string> = new BehaviorSubject<string>('');
	private store: Store = inject(Store);

	protected quotes$: Observable<Quote[]> = combineLatest([
		this.store.select(selQuote_EntityList),
		this.search.asObservable()
	]).pipe(

		map(([ quotes, searchTerm ]) => {

			if (searchTerm)
				return quotes.filter(quote => quote.name.includes(searchTerm));
			return quotes;

		})

	);
	protected selected$: Observable<Quote | null> = this.store.select(selQuoteSettings_selected);

	onSearch(term: string): void {

		this.search.next(term);

	}

	onCreate(quote: Partial<Quote>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.quote, entity: quote }));

	}

	onUpdate(quote: Quote): void {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.quote, id: quote.id, entity: quote }));

	}

	onSelected(id: UUID): void {

		this.store.dispatch(quoteActions.setSelectedId({ id }));

	}

	onDelete(id: UUID): void {

		this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.quote, id }));

	}

	onReset(): void {

		this.store.dispatch(quoteActions.setSelectedId({ id: null }));

	}

}
