import { ActionReducerMap } from '@ngrx/store';
import { Project_ModuleState } from '@states';
import { project_UIReducer } from './project-ui.reducer';

export const projectReducer: ActionReducerMap<Project_ModuleState> = {

	ui: project_UIReducer

}
