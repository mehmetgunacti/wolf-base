import { EntityName, UUID } from 'lib/constants';
import { Click, CloudTask, Entity, RemoteMetadata } from 'lib/models';
import { Observable } from 'rxjs';

export interface SyncService {

	downloadMetadata(): Observable<number>;

	uploadNew(entityName: EntityName, entities: Entity[]): Observable<RemoteMetadata>;

	uploadUpdated(entityName: EntityName, entities: Entity[]): Observable<RemoteMetadata>;

	uploadDeleted(entityName: EntityName, entities: Entity[]): Observable<UUID>;

	downloadNew(task: CloudTask): Observable<number>;

	downloadUpdated(task: CloudTask): Observable<number>;

	downloadDeleted(task: CloudTask): Observable<number>;

	deleteMetadata(task: CloudTask): Observable<number>;

}

export interface BookmarkSyncService {

	uploadClicks(clicks: Click[]): Observable<number>;

}
