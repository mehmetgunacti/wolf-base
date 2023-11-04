import { Bookmark, Click } from 'lib/models';
import { EntityRepository } from './entity.repository';
import { UUID } from 'lib/constants';

export interface BookmarksRepository extends EntityRepository<Bookmark> {

	toggleTag(id: UUID, name: string): Promise<void>;

	// clicks
	click(id: UUID): Promise<void>;
	storeClicks(items: Click[]): Promise<number>;
	listClicks(): Promise<Click[]>;
	listClicked(): Promise<Click[]>;

}
