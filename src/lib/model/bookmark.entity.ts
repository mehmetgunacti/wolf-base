import { BaseEntity } from './base-entity';
import { ID } from 'lib/constant';

export interface Bookmark extends BaseEntity {

	id: string;
	name: string;
	title: string;
	tags: string;
	image: string;
	url: string;
	clicks: number;

}

// export interface BookmarkDTO {
// 
// 	entities: {
// 		bookmarks: Record<string, Bookmark>;
// 	};
// 	result: ID[];
// 
// }
