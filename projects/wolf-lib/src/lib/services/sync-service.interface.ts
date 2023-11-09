import { Click, CloudTask } from 'lib/models';
import { Observable } from 'rxjs';

export interface SyncService {

	downloadMetadata(): Observable<number>;

	uploadNew(task: CloudTask): Observable<number>;

	uploadUpdated(task: CloudTask): Observable<number>;

	uploadDeleted(task: CloudTask): Observable<number>;

	downloadNew(task: CloudTask): Observable<number>;

	downloadUpdated(task: CloudTask): Observable<number>;

	downloadDeleted(task: CloudTask): Observable<number>;

	deleteMetadata(task: CloudTask): Observable<number>;

}

export interface BookmarkSyncService {

	uploadClicks(clicks: Click[]): Observable<number>;

}
