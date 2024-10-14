import { Entity, RemoteData, RemoteMetadata } from '@models';
import { UUID } from '@constants';
import { Observable } from 'rxjs';

export interface EntityRemoteRepository<T extends Entity> {

	upload(item: T): Observable<RemoteMetadata>;

	download(id: UUID): Observable<RemoteData<T> | null>;
	downloadMany(ids: UUID[]): Observable<RemoteData<T>[]>;

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null>;
	downloadAllMetadata(): Observable<RemoteMetadata[]>;

	delete(id: UUID): Observable<void>;
	trash(item: T): Observable<RemoteData<T>>;

}
