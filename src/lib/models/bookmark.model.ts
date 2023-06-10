import { Entity } from './entity.model';
import { SyncData, Syncable } from './sync.model';

export interface SyncBookmark extends SyncData<Bookmark> {

	clicks?: number;

}

export interface Bookmark extends Entity, Syncable<Bookmark, SyncBookmark> {

	name: string;
	title: string;
	tags: string[];
	urls: string[];
	clicks: number;
	image?: string;

}
