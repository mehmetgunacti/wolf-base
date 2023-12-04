import { inject } from '@angular/core';
import { Entity, EntityName, LocalRepositoryService, RemoteData, RemoteMetadata, SyncData, SyncService, UUID } from '@lib';
import { LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE } from 'app/app.config';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { Observable, concatMap, filter, from, iif, map, of, switchMap } from 'rxjs';

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

	uploadNew<T extends Entity>(entityName: EntityName, entities: T[]): Observable<RemoteMetadata> {

		return from(entities).pipe(

			// for each incoming id
			concatMap(entity =>

				// read entity from local storage
				from(this.localRepository.getRepository(entityName).getEntity(entity.id)).pipe(

					// check if entity exists
					filter((entity): entity is T => entity !== null),

					// upload entity
					switchMap(entity => this.uploadAndStore(entityName, entity))

				)

			)

		);

	}

	uploadUpdated<T extends Entity>(entityName: EntityName, entities: T[]): Observable<RemoteMetadata> {

		return from(entities).pipe(

			// for each incoming entity
			concatMap(entity =>

				// read entity from local storage
				from(this.localRepository.getRepository(entityName).getEntity(entity.id)).pipe(

					// if entity does not exist, skip
					filter((entity): entity is T => entity !== null),

					switchMap(entity =>

						// read syncData from local storage
						from(this.localRepository.getRepository(entityName).getSyncData(entity.id)).pipe(

							// perform syncData checks; skip this id if checks fail
							filter((syncData): syncData is SyncData => !!syncData && syncData.updated && !syncData.deleted),

							switchMap(syncData =>

								// download remoteMetadata
								this.remoteRepository.bookmarks.downloadMetadata(entity.id).pipe(

									// if remoteMetadata does not exist, skip this id
									// (in this case, remoteMetadata will not be removed from indexedDb table
									// problem will resolve when the "refresh" button is pressed and a "downloadAllRemoteMetadata" occurs)
									filter((remoteMetadata): remoteMetadata is RemoteMetadata => remoteMetadata !== null),

									// compare updateTime
									switchMap(remoteMetadata =>

										iif(

											// perform syncData - remoteMetadata checks
											() => syncData.updateTime === remoteMetadata.updateTime,

											// upload entity
											this.uploadAndStore(entityName, entity),

											// save remoteMetadata if syncData - remoteMetadata checks fail
											from(this.localRepository.getRepository(entityName).storeRemoteMetadata([remoteMetadata])).pipe(() => of(remoteMetadata))

										)

									)

								)

							)

						)

					)

				)

			)

		);

	}

	private uploadAndStore<T extends Entity>(entityName: EntityName, entity: T): Observable<RemoteMetadata> {

		return this.remoteRepository.getRepository(entityName).upload(entity).pipe(

			// store _sync and _remote data
			switchMap(remoteMetadata =>

				from(this.localRepository.getRepository(entityName).storeMetadata(remoteMetadata)).pipe(
					map(() => remoteMetadata)
				)

			)

		);

	}

	uploadDeleted<T extends Entity>(entityName: EntityName, entities: T[]): Observable<UUID> {

		return from(entities).pipe(

			// for each id
			concatMap(entity =>

				// download entity
				this.remoteRepository.getRepository(entityName).download(entity.id).pipe(

					// check if entity exist on server
					filter((remoteData): remoteData is RemoteData<T> => remoteData !== null),

					switchMap(remoteData =>

						// upload to remote trash collection
						this.remoteRepository.getRepository(entityName).trash(remoteData.entity).pipe(

							switchMap(() =>

								// delete from collection
								this.remoteRepository.getRepository(entityName).delete(entity.id).pipe(

									// delete local metadata
									switchMap(() =>

										from(this.localRepository.getRepository(entityName).remove(entity.id)).pipe(
											map(() => entity.id)
										)

									)

								)

							)

						)

					)

				)

			)

		);

	}

	downloadNew<T extends Entity>(entityName: EntityName, ids: UUID[]): Observable<RemoteData<T>> {

		return this.downloadAndStore(entityName, ids);

	}

	downloadUpdated<T extends Entity>(entityName: EntityName, ids: UUID[]): Observable<RemoteData<T>> {

		return this.downloadAndStore(entityName, ids);

	}

	private downloadAndStore<T extends Entity>(entityName: EntityName, ids: UUID[]): Observable<RemoteData<T>> {

		return from(ids).pipe(

			// for each id
			concatMap(id =>

				// download entity
				this.remoteRepository.getRepository(entityName).download(id).pipe(

					// check if entity exist on server
					filter((remoteData): remoteData is RemoteData<T> => remoteData !== null),

					// store all returned RemoteData
					switchMap(remoteData => from(this.localRepository.getRepository<T>(entityName).storeDownloadedEntity(remoteData)))

				)

			)

		);

	}

	downloadDeleted(entityName: EntityName, ids: UUID[]): Observable<UUID> {

		return from(ids).pipe(

			// for each id
			concatMap(id =>

				// delete entity locally
				from(this.localRepository.getRepository(entityName).remove(id))

			)

		);

	}

}
