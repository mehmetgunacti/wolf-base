import { UUID } from '@constants/common.constant';
import { ProjectQueryParams } from '@models/project.model';

export interface Project_ModuleState {

	ui: Project_UIState;

}

export interface Project_UIState {

	selectedId: UUID | null;
	queryParams: ProjectQueryParams;

}

// INITIALIZATION

export const initialProjectUIState: Project_UIState = {

	selectedId: null,
	queryParams: {

		search: null

	},

};

export const initialProjectState: Project_ModuleState = {

	ui: initialProjectUIState

};
