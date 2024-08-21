import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';
import { selProject_RemoteUpdated } from 'store/selectors/project-selectors/project-cloud.selectors';

@Injectable()
export class ProjectSyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.syncRemoteUpdated),
			withLatestFrom(this.store.select(selProject_RemoteUpdated)),
			switchMap(([, items]) =>

				this.syncService.downloadUpdated(AppEntityType.project, items).pipe(

					map(item => projectActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
