import { EntityBase } from './entity-base.model';
import { SyncData, Syncable } from './sync.model';

interface SyncBookmark extends SyncData<Bookmark> {

	clicks?: number;

}

export interface Bookmark extends EntityBase, Syncable<Bookmark, SyncBookmark> {

	name: string;
	title: string;
	tags: string[];
	urls: string[];
	clicks: number;
	image?: string;

}
