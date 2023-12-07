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

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.bookmarks.getEntity(id),
					this.localRepository.bookmarks.getSyncData(id),
					this.localRepository.bookmarks.getRemoteMetadata(id),
					this.localRepository.bookmarks.getClick(id)

				])
			),
			map(([id, bookmark, syncData, remoteMetadata, click]) => bmActions.loadOneSuccess({ id, bookmark, syncData, remoteMetadata, click }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.bookmarks.list(),
					this.localRepository.bookmarks.listSyncData(),
					this.localRepository.bookmarks.listRemoteMetadata(),
					this.localRepository.bookmarks.listClicks()

				])

			),
			map(([bookmarks, syncData, remoteMetadata, clicks]) => bmActions.loadAllSuccess({ bookmarks, syncData, remoteMetadata, clicks }))

		)

	);

	loadOneClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOneClick),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getClick(id)).pipe(
					map(click => bmActions.loadOneClickSuccess({ id, click }))
				)

			)

		)

	);


	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getSyncData(id)).pipe(

					map(syncData => bmActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	// loadAllSyncData$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bmActions.loadAllSyncData),
	// 		switchMap(() => this.localRepository.bookmarks.listSyncData()),
	// 		map(syncData => bmActions.loadAllSyncDataSuccess({ syncData }))

	// 	)

	// );

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

	// loadOneRemoteMetadata$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bmActions.loadOneRemoteMetadata),
	// 		switchMap(({ id }) =>

	// 			from(this.localRepository.bookmarks.getRemoteMetadata(id)).pipe(

	// 				map(remoteMetadata => {

	// 					if (remoteMetadata === null)
	// 						return bmActions.loadOneRemoteMetadataFailure({ id });
	// 					return bmActions.loadOneRemoteMetadataSuccess({ remoteMetadata });

	// 				})

	// 			)

	// 		)

	// 	)

	// );

	// loadTrashCount$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bmActions.loadTrashCount),
	// 		switchMap(() => this.localRepository.bookmarks.listDeletedItems()),
	// 		map(items => bmActions.loadTrashCountSuccess({ count: items.length }))

	// 	)

	// );

}
