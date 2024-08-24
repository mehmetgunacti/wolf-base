import { Injectable, inject } from '@angular/core';
import { SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selNote_RemoteDeleted } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class EntitySyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selNote_RemoteDeleted)),
			switchMap(([{ entityType }, items]) =>

				this.syncService.downloadDeleted(entityType, items).pipe(

					map(item => actions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
