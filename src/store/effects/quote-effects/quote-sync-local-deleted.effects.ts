import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quoteActions from 'store/actions/quote.actions';
import { selQuote_LocalDeleted } from 'store/selectors/quote-selectors/quote-cloud.selectors';

@Injectable()
export class QuoteSyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.syncLocalDeleted),
			withLatestFrom(this.store.select(selQuote_LocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(WolfEntity.quote, entities).pipe(

					map(item => quoteActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
