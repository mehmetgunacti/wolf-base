import { Bookmark, Click } from '@models/bookmark.model';
import { Observable } from 'rxjs';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface BookmarksRemoteRepository extends EntityRemoteRepository<Bookmark> {

	uploadClicks(clicks: Click[]): Observable<Click>;
	downloadClicks(): Observable<Click[]>;

}
