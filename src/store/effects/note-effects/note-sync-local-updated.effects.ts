import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';
import { selNote_LocalUpdated } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class NoteSyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.syncLocalUpdated),
			withLatestFrom(this.store.select(selNote_LocalUpdated)),
			switchMap(([, items]) =>

				this.syncService.uploadUpdated(EntityType.note, items).pipe(

					map(item => noteActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
