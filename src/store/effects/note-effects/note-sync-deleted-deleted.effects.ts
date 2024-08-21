import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';
import { selNote_LocalDeletedRemoteDeleted } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class NoteSyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.syncDeletedDeleted),
			withLatestFrom(this.store.select(selNote_LocalDeletedRemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(AppEntityType.note, items).pipe(

					map(item => noteActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
