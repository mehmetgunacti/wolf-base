import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Project_ModuleState } from 'store/states/project.state';

const selProject_ModuleState = createFeatureSelector<Project_ModuleState>('project');

export const selProject_EntitiesState = createSelector(

	selProject_ModuleState,
	state => state.entities

);

export const selProject_UIState = createSelector(

	selProject_ModuleState,
	state => state.ui

);
