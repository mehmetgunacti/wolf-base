import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';
import * as entityActions from 'store/actions/entity.actions';
import { selNote_RemoteUpdated } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class NoteSyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.syncRemoteUpdated),
			withLatestFrom(this.store.select(selNote_RemoteUpdated)),
			switchMap(([, items]) =>

				this.syncService.downloadUpdated(AppEntityType.note, items).pipe(

					map(item => entityActions.loadOne({ entityType: AppEntityType.note, id: item.id }))

				)

			)

		)

	);

}
