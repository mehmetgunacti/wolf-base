import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quoteActions from 'store/actions/quote.actions';
import { selQuote_LocalDeletedRemoteDeleted } from 'store/selectors/quote-selectors/quote-cloud.selectors';

@Injectable()
export class QuoteSyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.syncDeletedDeleted),
			withLatestFrom(this.store.select(selQuote_LocalDeletedRemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(EntityType.quote, items).pipe(

					map(item => quoteActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
