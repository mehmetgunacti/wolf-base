import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as wordActions from 'store/actions/word.actions';
import { selWord_LocalDeletedRemoteDeleted } from 'store/selectors/word-selectors/word-cloud.selectors';

@Injectable()
export class WordSyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.syncDeletedDeleted),
			withLatestFrom(this.store.select(selWord_LocalDeletedRemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(EntityType.word, items).pipe(

					map(item => wordActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
