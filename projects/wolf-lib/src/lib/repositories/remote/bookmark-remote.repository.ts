import { Bookmark, Click } from 'lib/models';
import { Observable } from 'rxjs';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface BookmarksRemoteRepository extends EntityRemoteRepository<Bookmark> {

	uploadClicks(clicks: Click[]): Observable<number>;
	downloadClicks(): Observable<Click[]>;

}
