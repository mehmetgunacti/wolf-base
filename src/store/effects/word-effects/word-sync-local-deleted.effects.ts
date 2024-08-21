import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as wordActions from 'store/actions/word.actions';
import { selWord_LocalDeleted } from 'store/selectors/word-selectors/word-cloud.selectors';

@Injectable()
export class WordSyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.syncLocalDeleted),
			withLatestFrom(this.store.select(selWord_LocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(AppEntityType.word, entities).pipe(

					map(item => wordActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
