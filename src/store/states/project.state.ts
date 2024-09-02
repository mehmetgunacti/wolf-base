import { ProjectQueryParams } from '@lib';

export interface Project_ModuleState {

	ui: Project_UIState;

}

export interface Project_UIState {

	queryParams: ProjectQueryParams;

}

// INITIALIZATION

export const initialProjectUIState: Project_UIState = {

	queryParams: {

		search: null

	},

};

export const initialProjectState: Project_ModuleState = {

	ui: initialProjectUIState

};
