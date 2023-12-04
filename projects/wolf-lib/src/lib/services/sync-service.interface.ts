import { EntityName } from 'lib/constants';
import { Click, NameBase } from 'lib/models';
import { Observable } from 'rxjs';

export interface SyncService {

	downloadMetadata(): Observable<number>;

	uploadNew(entityName: EntityName, items: NameBase[]): Observable<NameBase>;

	uploadUpdated(entityName: EntityName, items: NameBase[]): Observable<NameBase>;

	uploadDeleted(entityName: EntityName, items: NameBase[]): Observable<NameBase>;

	downloadNew(entityName: EntityName, items: NameBase[]): Observable<NameBase>;

	downloadUpdated(entityName: EntityName, items: NameBase[]): Observable<NameBase>;

	downloadDeleted(entityName: EntityName, items: NameBase[]): Observable<NameBase>;

}

export interface BookmarkSyncService {

	uploadClicks(clicks: Click[]): Observable<number>;

}
