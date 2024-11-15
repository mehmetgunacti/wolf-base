import { UUID } from '@constants/common.constant';
import { WordQueryParams } from '@models/word.model';

export interface Word_ModuleState {

	ui: Word_UIState;

}

export interface Word_UIState {

	selectedId: UUID | null;
	queryParams: WordQueryParams;

}

// INITIALIZATION

export const initialWordUIState: Word_UIState = {

	selectedId: null,
	queryParams: {
		search: null
	}

};

export const initialWordState: Word_ModuleState = {

	ui: initialWordUIState

};
