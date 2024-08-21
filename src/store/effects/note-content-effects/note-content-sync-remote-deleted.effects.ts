import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/note-content.actions';
import { selNoteContent_RemoteDeleted } from 'store/selectors/note-content-selectors/note-content-cloud.selectors';

@Injectable()
export class NoteContentSyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selNoteContent_RemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(EntityType.noteContent, items).pipe(

					map(item => actions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
