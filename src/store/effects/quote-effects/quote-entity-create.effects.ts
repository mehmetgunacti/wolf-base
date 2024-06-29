import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService, Quote } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as quoteActions from 'store/actions/quote.actions';

@Injectable()
export class QuoteEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.create),
			switchMap(({ quote }) =>

				from(
					this.localRepository.quotes.create(quote)
				).pipe(
					map((quote: Quote) => quoteActions.createSuccess({ quote }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Quote created' }))

		)

	);

	createSuccessToLoadOneQuote$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.createSuccess),
			map(({ quote }) => quoteActions.loadOne({ id: quote.id }))

		)

	);

}
