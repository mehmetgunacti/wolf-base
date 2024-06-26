import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as wordActions from 'store/actions/word.actions';
import { selWord_RemoteDeleted } from 'store/selectors/word-selectors/word-cloud.selectors';

@Injectable()
export class WordSyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selWord_RemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(WolfEntity.word, items).pipe(

					map(item => wordActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
