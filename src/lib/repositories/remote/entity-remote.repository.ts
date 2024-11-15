import { UUID } from '@constants/common.constant';
import { Entity } from '@models/entity.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
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
