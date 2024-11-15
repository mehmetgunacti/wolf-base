import { AppEntityType } from '@constants/entity.constant';
import { Click } from '@models/bookmark.model';
import { NameBase } from '@models/id-base.model';
import { RemoteMetadata } from '@models/remote.model';
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
