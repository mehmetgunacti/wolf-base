import { AppEntityType } from 'lib/constants';
import { Click, NameBase, RemoteMetadata } from 'lib/models';
import { Observable } from 'rxjs';

export interface SyncService {

	downloadMetadata(entityType: AppEntityType): Observable<RemoteMetadata[]>;

	uploadNew(entityType: AppEntityType, items: NameBase[]): Observable<NameBase>;

	uploadUpdated(entityType: AppEntityType, items: NameBase[]): Observable<NameBase>;

	uploadDeleted(entityType: AppEntityType, items: NameBase[]): Observable<NameBase>;

	downloadNew(entityType: AppEntityType, items: NameBase[]): Observable<NameBase>;

	downloadUpdated(entityType: AppEntityType, items: NameBase[]): Observable<NameBase>;

	downloadDeleted(entityType: AppEntityType, items: NameBase[]): Observable<NameBase>;

}

export interface BookmarkSyncService {

	uploadClicks(clicks: Click[]): Observable<Click>;

	downloadClicks(): Observable<Click[]>;

}
