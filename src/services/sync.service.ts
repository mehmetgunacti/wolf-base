import { inject } from "@angular/core";
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from "app/app.config";
import { Bookmark, Click, LocalStorageService, RemoteData, RemoteMetadata, RemoteStorageService, SyncData, UUID } from "lib";
import { SyncService } from "lib/services/sync-service.interface";
import { Observable, filter, from, map, mergeMap, switchMap, toArray } from "rxjs";

export class SyncServiceImpl implements SyncService {

	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	downloadMetadata(): Observable<number> {

		// download remote metadata list
		return this.remoteStorage.bookmarks.downloadMetadata().pipe(

			switchMap((rmd: RemoteMetadata[]) =>

				// store list in local storage
				from(this.localStorage.bookmarks.putRemoteMetadata(rmd)).pipe(

					// return length of list
					map(() => rmd.length)

				)

			)

		);

	}

	uploadEntities(ids: UUID[]): Observable<UUID[]> {

		return from(ids).pipe(

			// for each incoming id
			mergeMap(id =>

				// read entity from local storage
				from(this.localStorage.bookmarks.get(id)).pipe(

					// check if entity exists
					filter((bookmark): bookmark is Bookmark => bookmark !== null),

					// upload entity
					switchMap(entity => this.remoteStorage.bookmarks.upload(entity).pipe(

						// store all returned RemoteData
						switchMap(remoteData => this.localStorage.bookmarks.put(remoteData))

					)),

					// map to id
					map(() => id)

				),
				5 // concurrent

			),
			toArray()

		);

	}

	uploadDeleted(ids: UUID[]): Observable<number> {

		return from(ids).pipe(

			// for each id
			mergeMap(id =>

				// move from collection to trash
				this.remoteStorage.bookmarks.moveToTrash(id).pipe(

					// success?
					filter((id): id is UUID => id !== null),

					// delete local metadata
					switchMap(id => from(this.localStorage.bookmarks.delete(id)).pipe(map(() => id)))

				),
				5 // # concurrent inner observable subscriptions

			),
			toArray(),
			map(ids => ids.length)

		);

	}

	downloadMany(ids: UUID[]): Observable<number> {

		return this.remoteStorage.bookmarks.downloadMany(ids).pipe(

			// store all returned RemoteData
			switchMap((remoteData: RemoteData<Bookmark>[]) =>

				from(this.localStorage.bookmarks.putAll(remoteData)).pipe(

					map(() => remoteData.length)

				)

			)

		);

	}

	deleteMany(ids: string[]): Observable<number> {

		return from(this.localStorage.bookmarks.bulkDelete(ids)).pipe(map(() => ids.length));

	}

	uploadClicks(clicks: Click[]): Observable<number> {

		return from(clicks).pipe(

			mergeMap(click => this.remoteStorage.clicks.increase(click.id, click.current), 5),
			toArray(),
			map(ids => ids.length)

		);

	}

	downloadClicks(): Observable<number> {

		return this.remoteStorage.clicks.downloadMany().pipe(

			// download clicks
			switchMap(clicks => from(this.localStorage.clicks.putAll(clicks)).pipe(map(() => clicks.length)))

		);

	}

}