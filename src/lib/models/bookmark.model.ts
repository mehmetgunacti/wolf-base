import { Base } from './common.model';

export interface Bookmark extends Base {

	name: string;
	title: string;
	tags: string[];
	image: string;
	url: string;
	clicks: number;

}

export interface Click extends Base {

	clicks: number;

}

export interface BookmarksUIState {

	tagsVisible: boolean

}

export const initialBookmarksUIState: BookmarksUIState = {

	tagsVisible: false

}