import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quoteActions from 'store/actions/quote.actions';
import { selQuote_RemoteNew } from 'store/selectors/quote-selectors/quote-cloud.selectors';

@Injectable()
export class QuoteSyncRemoteNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.syncRemoteNew),
			withLatestFrom(this.store.select(selQuote_RemoteNew)),
			switchMap(([, items]) =>

				this.syncService.downloadNew(EntityType.quote, items).pipe(

					map(item => quoteActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
