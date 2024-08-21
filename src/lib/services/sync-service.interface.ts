import { EntityType } from 'lib/constants';
import { Click, NameBase } from 'lib/models';
import { Observable } from 'rxjs';

export interface SyncService {

	downloadMetadata(entityType: EntityType): Observable<number>;

	uploadNew(entityType: EntityType, items: NameBase[]): Observable<NameBase>;

	uploadUpdated(entityType: EntityType, items: NameBase[]): Observable<NameBase>;

	uploadDeleted(entityType: EntityType, items: NameBase[]): Observable<NameBase>;

	downloadNew(entityType: EntityType, items: NameBase[]): Observable<NameBase>;

	downloadUpdated(entityType: EntityType, items: NameBase[]): Observable<NameBase>;

	downloadDeleted(entityType: EntityType, items: NameBase[]): Observable<NameBase>;

}

export interface BookmarkSyncService {

	uploadClicks(clicks: Click[]): Observable<Click>;

	downloadClicks(): Observable<Click[]>;

}
