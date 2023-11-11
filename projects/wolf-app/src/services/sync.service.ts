import { inject } from '@angular/core';
import { Bookmark, CloudTask, Entity, LocalRepositoryService, RemoteData, RemoteMetadata, SyncData, SyncService, UUID, WolfEntity } from '@lib';
import { LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE } from 'app/app.config';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { EMPTY, Observable, concatMap, filter, from, iif, map, switchMap, toArray } from 'rxjs';

export class SyncServiceImpl implements SyncService {

	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private remoteRepository: RemoteRepositoryService = inject(REMOTE_REPOSITORY_SERVICE);

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

	uploadNew(task: CloudTask): Observable<number> {

		return from(task.entities).pipe(

			// for each incoming id
			concatMap(entity =>

				// read entity from local storage
				from(this.localRepository.getRepository(task.entity).getEntity(entity.id)).pipe(

					// check if entity exists
					filter((bookmark): bookmark is Bookmark => bookmark !== null),

					// upload entity
					switchMap(entity => this.uploadAndStore(task.entity, entity))

				)

			),
			toArray(),
			map(ids => ids.length)

		);

	}

	uploadUpdated(task: CloudTask): Observable<number> {

		return from(task.entities).pipe(

			// for each incoming id
			concatMap(entity =>

				// read entity from local storage
				from(this.localRepository.getRepository(task.entity).getEntity(entity.id)).pipe(

					// if entity does not exist, skip this id
					filter((bookmark): bookmark is Bookmark => bookmark !== null),

					// read syncData from local storage
					switchMap(bookmark => from(this.localRepository.getRepository(task.entity).getSyncData(entity.id)).pipe(

						// perform syncData checks; skip this id if checks fail
						filter((syncData): syncData is SyncData => !!syncData && syncData.updated && !syncData.deleted),

						// download remoteMetadata
						switchMap(syncData => this.remoteRepository.bookmarks.downloadMetadata(entity.id).pipe(

							// if remoteMetadata does not exist, skip this id
							filter((remoteMetadata): remoteMetadata is RemoteMetadata => remoteMetadata !== null),

							// compare updateTime
							switchMap(remoteMetadata =>

								iif(

									// perform syncData - remoteMetadata checks
									() => syncData.updateTime === remoteMetadata.updateTime,

									// upload entity
									this.uploadAndStore(task.entity, bookmark),

									// save remoteMetadata if syncData - remoteMetadata checks fail
									from(this.localRepository.getRepository(task.entity).storeRemoteMetadata([remoteMetadata])).pipe(() => EMPTY)

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

	private uploadAndStore(entity: WolfEntity, e: Entity): Observable<UUID> {

		return this.remoteRepository.getRepository(entity).upload(e).pipe(

			// store _sync and _remote data
			switchMap(remoteMetadata => this.localRepository.getRepository(entity).storeMetadata(remoteMetadata)),

			// complete stream
			map(() => e.id)

		);

	}

	uploadDeleted(task: CloudTask): Observable<number> {

		return from(task.entities).pipe(

			// for each id
			concatMap(entity =>

				// move from collection to trash
				this.moveRemoteToTrash(entity.id).pipe(

					// success?
					filter((remoteData): remoteData is RemoteData<Bookmark> => remoteData !== null),

					// delete local metadata
					switchMap(() => from(this.localRepository.getRepository(task.entity).delete(entity.id)).pipe(map(() => entity.id)))

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

	downloadNew(task: CloudTask): Observable<number> {

		return this.downloadAndStore(task.entity, task.entities);

	}

	downloadUpdated(task: CloudTask): Observable<number> {

		return this.downloadAndStore(task.entity, task.entities);

	}

	private downloadAndStore(entity: WolfEntity, entities: Entity[]): Observable<number> {

		// download remoteData
		return this.remoteRepository.bookmarks.downloadMany(entities.map(e => e.id)).pipe(

			// store all returned RemoteData
			switchMap(remoteData => from(this.localRepository.getRepository(entity).storeRemoteData(remoteData)))

		);

	}

	downloadDeleted(task: CloudTask): Observable<number> {

		return from(this.localRepository.getRepository(task.entity).bulkDelete(task.entities.map(e => e.id)));

	}

	deleteMetadata(task: CloudTask): Observable<number> {

		return from(this.localRepository.getRepository(task.entity).bulkDelete(task.entities.map(e => e.id)));

	}

}
