import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { Bookmark, Click, LocalRepositoryService, RemoteMetadata, SyncData } from '@lib';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadAllBookmarksSuccess, loadAllClicksSuccess, loadRemoteMetadataSuccess, loadSyncDataSuccess, loadTrashCountSuccess } from 'store/actions/bookmark.actions';

@Injectable()
export class BookmarkLocalStorageEffects {

	// private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_STORAGE_SERVICE);
	// private remoteRepository: RemoteRepositoryService = inject(REMOTE_STORAGE_SERVICE);

	loadBookmarks$ = createEffect(

		() => fromEventPattern<Bookmark[]>(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.localRepository.bookmarks.list()).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(bookmarks => loadAllBookmarksSuccess({ bookmarks }))
		)

	);

	loadClicks$ = createEffect(

		() => fromEventPattern<Click[]>(

			(handler) => liveQuery(() => this.localRepository.bookmarks.listClicks()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(clicks => loadAllClicksSuccess({ clicks }))
		)

	);

	loadBookmarksSyncData$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localRepository.bookmarks.listSyncData()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(syncData => loadSyncDataSuccess({ syncData }))
		)

	);

	loadBookmarksRemoteData$ = createEffect(

		() => fromEventPattern<RemoteMetadata[]>(

			(handler) => liveQuery(() => this.localRepository.bookmarks.listRemoteMetadata()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(remoteMetadata => loadRemoteMetadataSuccess({ remoteMetadata }))
		)

	);

	loadTrashCount$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localRepository.bookmarks.listDeletedItems()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(items => loadTrashCountSuccess({ count: items.length }))
		)

	);

}
