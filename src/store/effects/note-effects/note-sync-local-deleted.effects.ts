import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';
import { selNote_LocalDeleted } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class NoteSyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.syncLocalDeleted),
			withLatestFrom(this.store.select(selNote_LocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(WolfEntity.note, entities).pipe(

					map(item => noteActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
