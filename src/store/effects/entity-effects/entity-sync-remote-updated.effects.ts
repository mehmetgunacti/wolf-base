import { Injectable, inject } from '@angular/core';
import { SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selNote_RemoteUpdated } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class EntitySyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncRemoteUpdated),
			withLatestFrom(this.store.select(selNote_RemoteUpdated)),
			switchMap(([{ entityType }, items]) =>

				this.syncService.downloadUpdated(entityType, items).pipe(

					map(item => actions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
