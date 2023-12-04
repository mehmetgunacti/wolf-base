import { EntityName, UUID } from 'lib/constants';
import { Click, Entity, RemoteData, RemoteMetadata } from 'lib/models';
import { Observable } from 'rxjs';

export interface SyncService {

	downloadMetadata(): Observable<number>;

	uploadNew<T extends Entity>(entityName: EntityName, entities: T[]): Observable<RemoteMetadata>;

	uploadUpdated<T extends Entity>(entityName: EntityName, entities: T[]): Observable<RemoteMetadata>;

	uploadDeleted<T extends Entity>(entityName: EntityName, entities: T[]): Observable<UUID>;

	downloadNew<T extends Entity>(entityName: EntityName, ids: UUID[]): Observable<RemoteData<T>>;

	downloadUpdated<T extends Entity>(entityName: EntityName, ids: UUID[]): Observable<RemoteData<T>>;

	downloadDeleted(entityName: EntityName, ids: UUID[]): Observable<UUID>;

}

export interface BookmarkSyncService {

	uploadClicks(clicks: Click[]): Observable<number>;

}
