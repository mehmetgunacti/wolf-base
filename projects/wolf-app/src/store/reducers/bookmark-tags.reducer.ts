import { Action, createReducer, on } from '@ngrx/store';
import { search, setSelectedTags } from 'store/actions/bookmark-tags.actions';
import { BookmarkTagsState, initialBookmarkTagsState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkTagsState,

	on(search, (state, { term }): BookmarkTagsState => ({ ...state, searchTerm: term })),
	on(setSelectedTags, (state, { tags }): BookmarkTagsState => ({ ...state, selectedTags: tags })),

);

export function bookmarkTagsReducer(state: BookmarkTagsState | undefined, action: Action): BookmarkTagsState {
	return reducer(state, action);
}
