import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';

@Injectable()
export class BookmarkLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOneBookmark$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOneBookmark),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getEntity(id)).pipe(
					map(bookmark => bookmark ? bmActions.loadOneBookmarkSuccess({ bookmark }) : bmActions.loadOneBookmarkFailure({ id }))
				)

			),

		)

	);

	loadAllBookmarks$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllBookmarks),
			switchMap(() => this.localRepository.bookmarks.list()),
			map(bookmarks => bmActions.loadAllBookmarksSuccess({ bookmarks }))

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
