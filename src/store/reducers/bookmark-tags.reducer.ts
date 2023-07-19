import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import { BookmarkTagsState, initialBookmarkTagsState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkTagsState,

	on(BookmarkActions.Tags.search, (state, { term }): BookmarkTagsState => ({ ...state, searchTerm: term })),
	on(BookmarkActions.Tags.setSelectedTags, (state, { tags }): BookmarkTagsState => ({ ...state, selectedTags: tags })),

);

export function bookmarkTagsReducer(state: BookmarkTagsState | undefined, action: Action): BookmarkTagsState {
	return reducer(state, action);
}
