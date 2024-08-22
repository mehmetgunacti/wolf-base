import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task_ModuleState } from 'store/states/project-task.state';
import { selEntity_ModuleState } from '../entity-selectors/entity.selectors';

const selTask_ModuleState = createFeatureSelector<Task_ModuleState>('task');

export const selTask_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.task

);

export const selTask_UIState = createSelector(

	selTask_ModuleState,
	state => state.ui

);
