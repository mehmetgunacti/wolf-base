import { entityActions } from '@actions/entity.actions';
import { quoteActions } from '@actions/quote.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { QuoteSettingsListComponent } from '@components/quote-settings-list/quote-settings-list.component';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { QuoteSettingsForm } from '@forms/quote-settings/quote-settings.form';
import { BaseComponent } from '@libComponents/base.component';
import { Quote } from '@models/quote.model';
import { Store } from '@ngrx/store';
import { selQuote_EntityList } from '@selectors/entity/entity-quote.selectors';
import { selQuoteSettings_selected } from '@selectors/quote/quote-settings.selectors';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';

@Component({
	standalone: true,
	imports: [ QuoteSettingsForm, QuoteSettingsListComponent, AsyncPipe ],
	selector: 'app-quote-settings-container',
	templateUrl: './quote-settings.container.html',
	host: { 'class': 'comp p-4' }
})
export class QuoteSettingsContainer extends BaseComponent {

	private search: Subject<string> = new BehaviorSubject<string>('');
	private store: Store = inject(Store);

	protected quotes$: Observable<Quote[]> = combineLatest([
		this.store.select(selQuote_EntityList),
		this.search.asObservable()
	]).pipe(

		map(([ quotes, searchTerm ]) => {

			if (searchTerm)
				return quotes.filter(quote => quote.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
