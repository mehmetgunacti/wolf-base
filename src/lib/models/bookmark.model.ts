import { Model } from './common.model';

export interface Bookmark extends Model {

	name: string;
	title: string;
	tags: string[];
	image: string;
	url: string;
	clicks: number;

}

export interface Click extends Model {

	clicks: number;

}

export interface BookmarksUIState {

	tagsVisible: boolean

}

export const initialBookmarksUIState: BookmarksUIState = {

	tagsVisible: false

}