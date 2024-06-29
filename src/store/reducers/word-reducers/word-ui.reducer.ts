import { Action, createReducer, on } from '@ngrx/store';
import { setQueryParams } from 'store/actions/word.actions';
import { Word_UIState, initialWordUIState } from 'store/states/word.state';

const reducer = createReducer(

	initialWordUIState,
	on(setQueryParams, (state, { search }): Word_UIState => ({ ...state, queryParams: { search } }))
	// on(wordActions.openEditWordDialogSuccess, (state, { id }): WordUIState => ({ ...state, editDialogOverlayId: id })),
	// on(wordActions.closeEditWordDialogSuccess, (state): WordUIState => ({ ...state, editDialogOverlayId: null })),
	// on(fromClipboardFailure, (state, { shaking }): WordUIState => ({ ...state, shaking })),
	// on(createWordSuccess, (state): WordUIState => ({ ...state, editDialogVisible: false })),
	// on(updateWordSuccess, (state): WordUIState => ({ ...state, editDialogVisible: false })),
	// on(deleteWordSuccess, (state): WordUIState => ({ ...state, editDialogVisible: false }))

);

export function word_UIReducer(state: Word_UIState | undefined, action: Action): Word_UIState {
	return reducer(state, action);
}
