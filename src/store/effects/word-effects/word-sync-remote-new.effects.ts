import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as wordActions from 'store/actions/word.actions';
import { selWord_RemoteNew } from 'store/selectors/word-selectors/word-cloud.selectors';

@Injectable()
export class WordSyncRemoteNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.syncRemoteNew),
			withLatestFrom(this.store.select(selWord_RemoteNew)),
			switchMap(([, items]) =>

				this.syncService.downloadNew(AppEntityType.word, items).pipe(

					map(item => wordActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
