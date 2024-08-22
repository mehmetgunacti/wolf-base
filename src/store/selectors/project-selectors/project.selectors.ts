import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Project_ModuleState } from 'store/states/project.state';
import { selEntity_ModuleState } from '../entity-selectors/entity.selectors';

const selProject_ModuleState = createFeatureSelector<Project_ModuleState>('project');

export const selProject_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.project

);

export const selProject_UIState = createSelector(

	selProject_ModuleState,
	state => state.ui

);
