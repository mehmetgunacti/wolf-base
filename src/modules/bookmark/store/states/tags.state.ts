import { Tag } from 'lib';

export interface TagsState {

	tags: Tag[];
	tagCloudVisible: boolean;
	selected: string[];

}

export const tagsInitialState: TagsState = {

	tags: [],
	tagCloudVisible: false,
	selected: []

};
