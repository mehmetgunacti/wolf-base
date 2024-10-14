import { UUID } from '@constants';

export interface Quote_ModuleState {

	viewer: Quote_ViewerState;
	settings: Quote_SettingsState;

}

export interface Quote_ViewerState {

	selectedId: UUID | null;
	running: boolean;
	animate: boolean;

}

export interface Quote_SettingsState {

	selectedId: UUID | null;

}

// INITIALIZATION

export const quote_initialViewerState: Quote_ViewerState = {

	selectedId: null,
	running: false,
	animate: true

};

export const quote_initialSettingsState: Quote_SettingsState = {

	selectedId: null

};

export const quote_initialModuleState: Quote_ModuleState = {

	viewer: quote_initialViewerState,
	settings: quote_initialSettingsState

};
