import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Project_ModuleState } from '@states';

const selProject_ModuleState = createFeatureSelector<Project_ModuleState>('project');

export const selProject_UIState = createSelector(

	selProject_ModuleState,
	state => state.ui

);
