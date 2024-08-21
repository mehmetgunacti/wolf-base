import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quoteActions from 'store/actions/quote.actions';
import { selQuote_LocalUpdated } from 'store/selectors/quote-selectors/quote-cloud.selectors';

@Injectable()
export class QuoteSyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.syncLocalUpdated),
			withLatestFrom(this.store.select(selQuote_LocalUpdated)),
			switchMap(([, items]) =>

				this.syncService.uploadUpdated(AppEntityType.quote, items).pipe(

					map(item => quoteActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
