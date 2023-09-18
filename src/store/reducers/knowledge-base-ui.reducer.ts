import { Action, createReducer } from '@ngrx/store';
import { KnowledgeBaseUIState, initialKnowledgeBaseUIState } from 'store/states/knowledge-base.state';

const reducer = createReducer(

	initialKnowledgeBaseUIState,
	// on(toggleSearchAndTagCloudVisibility, state => ({ ...state, tagCloudVisible: !state.tagCloudVisible })),
	// on(openAddBookmarkDialog, (state): BookmarkUIState => ({ ...state, editDialogVisible: true })),
	// on(openEditBookmarkDialog, (state, { id }): BookmarkUIState => ({ ...state, editDialogVisible: true })),
	// on(closeEditBookmarkDialog, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	// on(createBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	// on(updateBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	// on(deleteBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false }))

);

export function knowledgeBaseUIReducer(state: KnowledgeBaseUIState | undefined, action: Action): KnowledgeBaseUIState {
	return reducer(state, action);
}
