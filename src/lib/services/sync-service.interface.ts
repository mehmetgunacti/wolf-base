import { UUID } from "lib/constants";
import { Click, SyncData } from "lib/models";
import { Observable } from "rxjs";

export interface SyncService {

	downloadMetadata(): Observable<number>;

	uploadEntities(ids: UUID[]): Observable<UUID[]>;

	uploadDeleted(ids: UUID[]): Observable<number>;

	downloadMany(ids: UUID[]): Observable<number>;

	deleteMany(ids: UUID[]): Observable<number>;

	uploadClicks(clicks: Click[]): Observable<number>;

	downloadClicks(): Observable<number>;

}