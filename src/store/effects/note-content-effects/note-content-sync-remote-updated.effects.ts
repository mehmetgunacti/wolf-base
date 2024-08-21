import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/note-content.actions';
import { selNoteContent_RemoteUpdated } from 'store/selectors/note-content-selectors/note-content-cloud.selectors';

@Injectable()
export class NoteContentSyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncRemoteUpdated),
			withLatestFrom(this.store.select(selNoteContent_RemoteUpdated)),
			switchMap(([, items]) =>

				this.syncService.downloadUpdated(AppEntityType.noteContent, items).pipe(

					map(item => actions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
