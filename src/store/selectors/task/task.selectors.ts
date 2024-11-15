import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task_ModuleState } from '@states/task.state';

const selTask_ModuleState = createFeatureSelector<Task_ModuleState>('task');

export const selTask_UIState = createSelector(

	selTask_ModuleState,
	state => state.ui

);
