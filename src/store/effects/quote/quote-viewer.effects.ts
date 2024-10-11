import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { coreActions, quoteActions } from 'store/actions';
import { selQuote_EntityIds } from 'store/selectors/entity/entity-quote.selectors';
import { selQuoteViewer_running } from 'store/selectors/quote/quote-viewer.selectors';

@Injectable()
export class QuoteViewerEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private repository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	setQuotesRunning$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.setRunning),
			switchMap(({ running }) => this.repository.configuration.setQuotesRunning(running))

		),
		{ dispatch: false }

	);

	setRunning$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.loadAllSuccess),
			map(({ configuration }) => configuration.quotesRunning),
			map(running => quoteActions.setRunning({ running }))

		)

	);

	changeQuote$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.setNow),
			withLatestFrom(this.store.select(selQuoteViewer_running)),
			filter(([, running]) => running),
			withLatestFrom(this.store.select(selQuote_EntityIds)),
			map(([, ids]) => ids[Math.floor(Math.random() * ids.length)]),
			map(id => quoteActions.changeQuote({ id }))

		)

	);

}
