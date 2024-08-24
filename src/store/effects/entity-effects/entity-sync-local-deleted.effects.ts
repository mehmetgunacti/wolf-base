import { Injectable, inject } from '@angular/core';
import { SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selNote_LocalDeleted } from 'store/selectors/note-selectors/note-cloud.selectors';

@Injectable()
export class EntitySyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncLocalDeleted),
			withLatestFrom(this.store.select(selNote_LocalDeleted)),
			switchMap(([{ entityType }, entities]) =>

				this.syncService.uploadDeleted(entityType, entities).pipe(

					map(item => actions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
