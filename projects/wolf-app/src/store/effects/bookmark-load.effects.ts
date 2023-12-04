import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import * as cloudActions from 'store/actions/cloud.actions';

@Injectable()
export class BookmarkLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOneBookmark$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOne),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getEntity(id)).pipe(
					map(bookmark => bookmark ? bmActions.loadOneSuccess({ bookmark }) : bmActions.loadOneFailure({ id }))
				)

			),

		)

	);

	loadAllBookmarks$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAll),
			switchMap(() => this.localRepository.bookmarks.list()),
			map(bookmarks => bmActions.loadAllSuccess({ bookmarks }))

		)

	);

	loadAllClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllClicks),
			switchMap(() => this.localRepository.bookmarks.listClicks()),
			map(clicks => bmActions.loadAllClicksSuccess({ clicks }))

		)

	);


	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getSyncData(id)).pipe(

					map(syncData => {

						if (syncData === null)
							return bmActions.loadOneSyncDataFailure({ id });
						return bmActions.loadOneSyncDataSuccess({ syncData });

					})

				)

			)

		)

	);

	loadAllSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllSyncData),
			switchMap(() => this.localRepository.bookmarks.listSyncData()),
			map(syncData => bmActions.loadAllSyncDataSuccess({ syncData }))

		)

	);

	downloadRemoteDataSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(cloudActions.downloadRemoteDataSuccess),
			map(() => bmActions.loadAllRemoteMetadata())

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.bookmarks.listRemoteMetadata()),
			map(remoteMetadata => bmActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

	loadOneRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOneRemoteMetadata),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getRemoteMetadata(id)).pipe(

					map(remoteMetadata => {

						if (remoteMetadata === null)
							return bmActions.loadOneRemoteMetadataFailure({ id });
						return bmActions.loadOneRemoteMetadataSuccess({ remoteMetadata });

					})

				)

			)

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
