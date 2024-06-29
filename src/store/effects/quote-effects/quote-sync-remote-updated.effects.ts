import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quoteActions from 'store/actions/quote.actions';
import { selQuote_RemoteUpdated } from 'store/selectors/quote-selectors/quote-cloud.selectors';

@Injectable()
export class QuoteSyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.syncRemoteUpdated),
			withLatestFrom(this.store.select(selQuote_RemoteUpdated)),
			switchMap(([, items]) =>

				this.syncService.downloadUpdated(WolfEntity.quote, items).pipe(

					map(item => quoteActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
