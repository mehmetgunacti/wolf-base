import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as wordActions from 'store/actions/word.actions';
import { selWord_RemoteUpdated } from 'store/selectors/word-selectors/word-cloud.selectors';

@Injectable()
export class WordSyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.syncRemoteUpdated),
			withLatestFrom(this.store.select(selWord_RemoteUpdated)),
			switchMap(([, items]) =>

				this.syncService.downloadUpdated(EntityType.word, items).pipe(

					map(item => wordActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
