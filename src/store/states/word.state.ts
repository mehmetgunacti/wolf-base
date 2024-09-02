import { WordQueryParams } from '@lib';

export interface Word_ModuleState {

	ui: Word_UIState;

}

export interface Word_UIState {

	queryParams: WordQueryParams;

}

// INITIALIZATION

export const initialWordUIState: Word_UIState = {

	queryParams: {
		search: null
	}

};

export const initialWordState: Word_ModuleState = {

	ui: initialWordUIState

};
