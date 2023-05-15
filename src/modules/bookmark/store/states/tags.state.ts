
export interface TagsState {

	selectedTags: string[];
	disabledTags: string[];
	searchTerm: string | null;

}

export const tagsInitialState: TagsState = {

	selectedTags: [],
	disabledTags: [],
	searchTerm: null

};
