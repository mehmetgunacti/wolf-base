import { coreActions } from '@actions/core.actions';
import { quoteActions } from '@actions/quote.actions';
import { inject, Injectable } from '@angular/core';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selQuote_EntityIds } from '@selectors/entity/entity-quote.selectors';
import { selQuoteViewer_running } from '@selectors/quote/quote-viewer.selectors';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

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

	changeQuote$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.setNow),
			withLatestFrom(this.store.select(selQuoteViewer_running)),
			filter(([ , running ]) => running),
			withLatestFrom(this.store.select(selQuote_EntityIds)),
			map(([ , ids ]) => ids[ Math.floor(Math.random() * ids.length) ]),
			map(id => quoteActions.changeQuote({ id }))

		)

	);

}
