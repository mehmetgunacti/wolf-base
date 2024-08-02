import { ActionReducerMap } from "@ngrx/store";
import { Task_ModuleState } from 'store/states/project-task.state';
import { task_EntitiesReducer } from "./task-entities.reducer";
import { task_UIReducer } from './task-ui.reducer';

export const taskReducer: ActionReducerMap<Task_ModuleState> = {

	entities: task_EntitiesReducer,
	ui: task_UIReducer

}
