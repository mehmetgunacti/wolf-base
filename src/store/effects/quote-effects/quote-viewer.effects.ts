import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { timer } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadAllSuccess } from 'store/actions/core.actions';
import { changeQuote, setRunning } from 'store/actions/quote.actions';
import { selQuote_ids } from 'store/selectors/quote-selectors/quote-entities.selectors';
import { selQuoteViewer_running } from 'store/selectors/quote-selectors/quote-viewer.selectors';

@Injectable()
export class QuoteViewerEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private repository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	setQuotesRunning$ = createEffect(

		() => this.actions$.pipe(

			ofType(setRunning),
			switchMap(({ running }) => this.repository.configuration.setQuotesRunning(running))

		),
		{ dispatch: false }

	);

	setRunning$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadAllSuccess),
			map(({ configuration }) => configuration.quotesRunning),
			map(running => setRunning({ running }))

		)

	);

	changeQuote$ = createEffect(

		() => this.actions$.pipe(

			ofType(setRunning),
			switchMap(

				({ running }) => timer(0, 60 * 1000).pipe(

					filter(() => running),
					withLatestFrom(this.store.select(selQuote_ids)),
					map(([, ids]) => ids[Math.floor(Math.random() * ids.length)]),
					map(id => changeQuote({ id }))


				)

			)

		)

	);

}
