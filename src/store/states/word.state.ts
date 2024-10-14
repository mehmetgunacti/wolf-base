import { UUID } from '@constants';
import { WordQueryParams } from '@models';

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
