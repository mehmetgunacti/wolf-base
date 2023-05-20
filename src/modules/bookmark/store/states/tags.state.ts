
export interface TagsState {

	selectedTags: string[];
	searchTerm: string | null;

}

export const tagsInitialState: TagsState = {

	selectedTags: [],
	searchTerm: null

};
