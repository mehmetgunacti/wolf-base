import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { map, switchMap } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';

@Injectable()
export class BookmarkLocalRepositoryEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadAllClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllClicks),
			switchMap(() => this.localRepository.bookmarks.listClicks()),
			map(clicks => bmActions.loadAllClicksSuccess({ clicks }))

		)

	);

	loadAllSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllSyncData),
			switchMap(() => this.localRepository.bookmarks.listSyncData()),
			map(syncData => bmActions.loadAllSyncDataSuccess({ syncData }))

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.bookmarks.listRemoteMetadata()),
			map(remoteMetadata => bmActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

	loadTrashCount$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadTrashCount),
			switchMap(() => this.localRepository.bookmarks.listDeletedItems()),
			map(items => bmActions.loadTrashCountSuccess({ count: items.length }))

		)

	);

}
