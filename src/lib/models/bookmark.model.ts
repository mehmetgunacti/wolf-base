import { Entity, SyncData } from './entity.model';

export interface SyncBookmark extends SyncData<Bookmark> {

	clicks?: number;

}

export interface Bookmark extends Entity<Bookmark> {

	name: string;
	title: string;
	tags: string[];
	urls: string[];
	clicks: number;
	image?: string;
	sync?: SyncBookmark;

}