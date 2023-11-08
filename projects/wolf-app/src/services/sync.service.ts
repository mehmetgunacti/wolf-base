import { inject } from '@angular/core';
import { Bookmark, Click, LocalRepositoryService, RemoteData, RemoteMetadata, SyncData, SyncService, UUID } from '@lib';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { EMPTY, Observable, concatMap, filter, from, iif, map, switchMap, toArray } from 'rxjs';

export class SyncServiceImpl implements SyncService {

	private localRepository: LocalRepositoryService = inject(LOCAL_STORAGE_SERVICE);
	private remoteRepository: RemoteRepositoryService = inject(REMOTE_STORAGE_SERVICE);

	downloadMetadata(): Observable<number> {

		// download remote metadata list
		return this.remoteRepository.bookmarks.downloadAllMetadata().pipe(

			switchMap((rmd: RemoteMetadata[]) =>

				// store list in local storage
				from(this.localRepository.bookmarks.storeRemoteMetadata(rmd)).pipe(

					// return length of list
					map(() => rmd.length)

				)

			)

		);

	}

	uploadNew(ids: UUID[]): Observable<number> {

		return from(ids).pipe(

			// for each incoming id
			concatMap(id =>

				// read entity from local storage
				from(this.localRepository.bookmarks.getEntity(id)).pipe(

					// check if entity exists
					filter((bookmark): bookmark is Bookmark => bookmark !== null),

					// upload entity
					switchMap(entity => this.uploadAndStore(entity))

				)

			),
			toArray(),
			map(ids => ids.length)

		);

	}

	uploadUpdated(ids: string[]): Observable<number> {

		return from(ids).pipe(

			// for each incoming id
			concatMap(id =>

				// read entity from local storage
				from(this.localRepository.bookmarks.getEntity(id)).pipe(

					// if entity does not exist, skip this id
					filter((bookmark): bookmark is Bookmark => bookmark !== null),

					// read syncData from local storage
					switchMap(bookmark => from(this.localRepository.bookmarks.getSyncData(id)).pipe(

						// perform syncData checks; skip this id if checks fail
						filter((syncData): syncData is SyncData => !!syncData && syncData.updated && !syncData.deleted),

						// download remoteMetadata
						switchMap(syncData => this.remoteRepository.bookmarks.downloadMetadata(id).pipe(

							// if remoteMetadata does not exist, skip this id
							filter((remoteMetadata): remoteMetadata is RemoteMetadata => remoteMetadata !== null),

							// compare updateTime
							switchMap(remoteMetadata =>

								iif(

									// perform syncData - remoteMetadata checks
									() => syncData.updateTime === remoteMetadata.updateTime,

									// upload entity
									this.uploadAndStore(bookmark),

									// save remoteMetadata if syncData - remoteMetadata checks fail
									from(this.localRepository.bookmarks.storeRemoteMetadata([remoteMetadata])).pipe(() => EMPTY)

								)

							)

						))

					))

				)

			),
			toArray(),
			map(ids => ids.length)

		);

	}

	private uploadAndStore(entity: Bookmark): Observable<UUID> {

		return this.remoteRepository.bookmarks.upload(entity).pipe(

			// store _sync and _remote data
			switchMap(remoteMetadata => this.localRepository.bookmarks.storeMetadata(remoteMetadata)),

			// complete stream
			map(() => entity.id)

		);

	}

	uploadDeleted(ids: UUID[]): Observable<number> {

		return from(ids).pipe(

			// for each id
			concatMap(id =>

				// move from collection to trash
				this.moveRemoteToTrash(id).pipe(

					// success?
					filter((remoteData): remoteData is RemoteData<Bookmark> => remoteData !== null),

					// delete local metadata
					switchMap(() => from(this.localRepository.bookmarks.delete(id)).pipe(map(() => id)))

				)

			),
			toArray(),
			map(ids => ids.length)

		);

	}

	private moveRemoteToTrash(id: UUID): Observable<RemoteData<Bookmark>> {

		return this.remoteRepository.bookmarks.download(id).pipe(

			filter((remoteData): remoteData is RemoteData<Bookmark> => remoteData !== null),

			switchMap(remoteData => this.remoteRepository.bookmarks.trash(remoteData.entity))

		);

	}

	downloadNew(ids: UUID[]): Observable<number> {

		return this.downloadAndStore(ids);

	}

	downloadUpdated(ids: UUID[]): Observable<number> {

		return this.downloadAndStore(ids);

	}

	private downloadAndStore(ids: UUID[]): Observable<number> {

		// download remoteData
		return this.remoteRepository.bookmarks.downloadMany(ids).pipe(

			// store all returned RemoteData
			switchMap(remoteData => from(this.localRepository.bookmarks.storeRemoteData(remoteData)))

		);

	}

	downloadDeleted(ids: string[]): Observable<number> {

		return from(this.localRepository.bookmarks.bulkDelete(ids));

	}

	uploadClicks(clicks: Click[]): Observable<number> {

		return from(this.remoteRepository.bookmarks.uploadClicks(clicks));

	}

	downloadClicks(): Observable<number> {

		// download all clicks
		return this.remoteRepository.bookmarks.downloadClicks().pipe(

			// store clicks
			switchMap(clicks => from(this.localRepository.bookmarks.storeClicks(clicks)))

		);

	}

	deleteMetadata(ids: UUID[]): Observable<number> {

		return from(this.localRepository.bookmarks.bulkDelete(ids));

	}

}
