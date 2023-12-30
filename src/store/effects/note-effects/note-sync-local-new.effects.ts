import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';
import { selNote_LocalNew } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class NoteSyncLocalNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.syncLocalNew),
			withLatestFrom(this.store.select(selNote_LocalNew)),
			switchMap(([, items]) =>

				this.syncService.uploadNew(WolfEntity.note, items).pipe(

					map(item => noteActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
