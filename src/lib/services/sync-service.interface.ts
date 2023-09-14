import { UUID } from "lib/constants";
import { Click } from "lib/models";
import { Observable } from "rxjs";

export interface SyncService {

	downloadMetadata(): Observable<number>;

	uploadNew(ids: UUID[]): Observable<number>;

	uploadUpdated(ids: UUID[]): Observable<number>;

	uploadDeleted(ids: UUID[]): Observable<number>;

	downloadNew(ids: UUID[]): Observable<number>;

	downloadUpdated(ids: UUID[]): Observable<number>;

	downloadDeleted(ids: UUID[]): Observable<number>;

	uploadClicks(clicks: Click[]): Observable<number>;

	downloadClicks(): Observable<number>;

	deleteMetadata(ids: UUID[]): Observable<number>;

}