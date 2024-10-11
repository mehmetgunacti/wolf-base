import { inject, Injectable } from '@angular/core';
import { AppEntityType, RemoteMetadata, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SYNC_SERVICE } from 'app/app.config';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { entityActions } from 'store/actions';

interface Result {

	type: AppEntityType,
	data: RemoteMetadata[]

}

@Injectable()
export class EntitySyncRemoteRefreshEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SYNC_SERVICE);

	downloadRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.downloadRemoteMetadata),
			switchMap(() => forkJoin(this.createOps()).pipe(

				map((results: Result[]) => {

					return results.reduce((acc: Record<AppEntityType, RemoteMetadata[]>, result: Result) => {
						acc[result.type] = result.data;
						return acc;
					}, {} as Record<AppEntityType, RemoteMetadata[]>);

				})

			)),
			map(data => entityActions.downloadRemoteMetadataSuccess({ data }))

		)

	);

	private createOps(): Observable<Result>[] {

		return Object.values(AppEntityType).map(

			entityType => this.syncService.downloadMetadata(entityType).pipe(

				map(data => ({ type: entityType, data } satisfies Result))

			)

		);

	}

}
