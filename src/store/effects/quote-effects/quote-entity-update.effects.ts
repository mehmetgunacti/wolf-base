import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as quoteActions from 'store/actions/quote.actions';

@Injectable()
export class QuoteEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.update),
			switchMap(({ id, quote }) =>

				from(
					this.localRepository.quotes.update(id, quote)
				).pipe(
					map(() => quoteActions.updateSuccess({ id }))
				)

			)

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.updateSuccess),
			map(({ id }) => navigate({ url: ['/quotes', id] }))

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Quote updated' }))

		)

	);

	loadOneQuote$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.updateSuccess),
			map(({ id }) => quoteActions.loadOne({ id }))

		)

	);

	loadOneQuoteSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.updateSuccess),
			map(({ id }) => quoteActions.loadOneSyncData({ id }))

		)

	);

}
