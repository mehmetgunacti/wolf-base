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

	loadAllClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllClicks),
			switchMap(() =>

				from(this.localRepository.bookmarks.listClicks()).pipe(
					map(clicks => bmActions.loadAllClicksSuccess({ clicks }))
				)

			)

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

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.bookmarks.listRemoteMetadata()),
			map(remoteMetadata => bmActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

}
