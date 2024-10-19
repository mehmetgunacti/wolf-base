import { inject, InjectionToken } from '@angular/core';
import { AppEntityType } from '@constants';
import { BookmarkSyncService, LocalRepositoryService, RemoteRepositoryService, SyncService } from '@libServices';
import { Entity, IndexedDbConfiguration, NameBase, RemoteData, RemoteMetadata, SyncData } from '@models';
import { concatMap, filter, from, iif, map, Observable, switchMap } from 'rxjs';
import { BookmarkSyncServiceImpl } from './bookmark-sync.service';
import { LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE } from './repository.service';

export class SyncServiceImpl implements SyncService {

	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private remoteRepository: RemoteRepositoryService = inject(REMOTE_REPOSITORY_SERVICE);

	downloadMetadata(entityType: AppEntityType): Observable<RemoteMetadata[]> {

		// download remote metadata list
		return this.remoteRepository.getRepository(entityType).downloadAllMetadata().pipe(

			switchMap((rmd: RemoteMetadata[]) =>

				// store list in local storage
				from(this.localRepository.getRepository(entityType).storeAllRemoteMetadata(rmd)).pipe(

					// return list
					map(() => rmd)

				)

			)

		);

	}

	uploadNew(entityType: AppEntityType, items: NameBase[]): Observable<NameBase> {

		return from(items).pipe(

			// for each incoming id
			concatMap(item =>

				// read entity from local storage
				from(this.localRepository.getRepository(entityType).getEntity(item.id)).pipe(

					// check if entity exists
					filter((entity): entity is Entity => entity !== null),

					// upload entity
					switchMap(entity => this.uploadAndStore(entityType, entity))

				)

			)

		);

	}

	uploadUpdated(entityType: AppEntityType, items: NameBase[]): Observable<RemoteMetadata> {

		return from(items).pipe(

			// for each incoming entity
			concatMap(item =>

				// read entity from local storage
				from(this.localRepository.getRepository(entityType).getEntity(item.id)).pipe(

					// if entity does not exist, skip
					filter((entity): entity is Entity => entity !== null),

					switchMap(entity =>

						// read syncData from local storage
						from(this.localRepository.getRepository(entityType).getSyncData(entity.id)).pipe(

							// perform syncData checks; skip this id if checks fail
							filter((syncData): syncData is SyncData => !!syncData && syncData.updated && !syncData.deleted),

							switchMap(syncData =>

								// download remoteMetadata
								this.remoteRepository.getRepository(entityType).downloadMetadata(entity.id).pipe(

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
											this.uploadAndStore(entityType, entity),

											// save remoteMetadata if syncData - remoteMetadata checks fail
											from(this.localRepository.getRepository(entityType).storeOneRemoteMetadata(remoteMetadata))

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

	private uploadAndStore(entityType: AppEntityType, entity: Entity): Observable<RemoteMetadata> {

		return this.remoteRepository.getRepository(entityType).upload(entity).pipe(

			// store _sync and _remote data
			switchMap(remoteMetadata =>

				from(this.localRepository.getRepository(entityType).storeMetadata(remoteMetadata)).pipe(
					map(() => remoteMetadata)
				)

			)

		);

	}

	uploadDeleted(entityType: AppEntityType, items: NameBase[]): Observable<NameBase> {

		return from(items).pipe(

			// for each id
			concatMap(item =>

				// download entity
				this.remoteRepository.getRepository(entityType).download(item.id).pipe(

					// check if entity exist on server
					filter((remoteData): remoteData is RemoteData<Entity> => remoteData !== null),

					switchMap(remoteData =>

						// upload to remote trash collection
						this.remoteRepository.getRepository(entityType).trash(remoteData.entity).pipe(

							switchMap(() =>

								// delete from collection
								this.remoteRepository.getRepository(entityType).delete(item.id).pipe(

									// delete local metadata
									switchMap(() =>

										from(this.localRepository.getRepository(entityType).remove(item.id)).pipe(
											map(() => item)
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

	downloadNew(entityType: AppEntityType, items: NameBase[]): Observable<NameBase> {

		return this.downloadAndStore(entityType, items);

	}

	downloadUpdated(entityType: AppEntityType, items: NameBase[]): Observable<NameBase> {

		return this.downloadAndStore(entityType, items);

	}

	private downloadAndStore(entityType: AppEntityType, items: NameBase[]): Observable<NameBase> {

		return from(items).pipe(

			// for each id
			concatMap(item =>

				// download entity
				this.remoteRepository.getRepository(entityType).download(item.id).pipe(

					// check if entity exist on server
					filter((remoteData): remoteData is RemoteData<Entity> => remoteData !== null),

					switchMap(remoteData =>

						// store all returned RemoteData
						from(this.localRepository.getRepository(entityType).storeDownloadedEntity(remoteData)).pipe(
							map(() => item)
						)

					)

				)

			)

		);

	}

	downloadDeleted(entityType: AppEntityType, items: NameBase[]): Observable<NameBase> {

		return from(items).pipe(

			// for each id
			concatMap(item =>

				// delete entity locally
				from(this.localRepository.getRepository(entityType).remove(item.id)).pipe(
					map(() => item)
				)

			)

		);

	}

}

export const SYNC_SERVICE = new InjectionToken<SyncService>('SyncService');
export const BOOKMARK_SYNC_SERVICE = new InjectionToken<BookmarkSyncService>('BookmarkSyncService');

export const syncServiceProvider = { provide: SYNC_SERVICE, useClass: SyncServiceImpl, deps: [ LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE ] };
export const bookmarkSyncServiceProvider = { provide: BOOKMARK_SYNC_SERVICE, useClass: BookmarkSyncServiceImpl, deps: [ LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE ] };

export const DATABASE_CONFIG = new InjectionToken<IndexedDbConfiguration>('IndexedDbConfiguration');
