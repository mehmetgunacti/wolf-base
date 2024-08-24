import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';
import * as entityActions from 'store/actions/entity.actions';
import { selNote_RemoteDeleted } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class NoteSyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selNote_RemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(AppEntityType.note, items).pipe(

					map(item => entityActions.unloadOne({ entityType: AppEntityType.note, id: item.id }))

				)

			)

		)

	);

}
