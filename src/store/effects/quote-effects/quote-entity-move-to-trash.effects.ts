import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as quoteActions from 'store/actions/quote.actions';

@Injectable()
export class QuoteEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.quotes.moveToTrash(id)
				).pipe(
					map(() => quoteActions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Quote removed' }))

		)

	);

	loadAllQuotes$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.moveToTrashSuccess),
			map(({ id }) => quoteActions.loadAll())

		)

	);

}
