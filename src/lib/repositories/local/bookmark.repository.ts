import { UUID } from '@constants/common.constant';
import { Bookmark, Click } from '@models/bookmark.model';
import { EntityLocalRepository } from './entity.repository';

export interface BookmarksLocalRepository extends EntityLocalRepository<Bookmark> {

	toggleTag(id: UUID, name: string): Promise<void>;

	// clicks
	click(id: UUID): Promise<void>;
	getClick(id: UUID): Promise<Click | null>;
	storeClick(click: Click): Promise<Click>;
	storeClicks(items: Click[]): Promise<Click[]>;
	listClicks(): Promise<Click[]>;
	listClicked(): Promise<Click[]>;

}
