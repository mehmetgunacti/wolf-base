import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/note-content.actions';
import { selNoteContent_LocalDeleted } from 'store/selectors/note-content-selectors/note-content-cloud.selectors';

@Injectable()
export class NoteContentSyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncLocalDeleted),
			withLatestFrom(this.store.select(selNoteContent_LocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(WolfEntity.note_content, entities).pipe(

					map(item => actions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
