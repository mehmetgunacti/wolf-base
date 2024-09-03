import { ActionReducerMap } from "@ngrx/store";
import { Task_ModuleState } from 'store/states/task.state';
import { task_UIReducer } from './task-ui.reducer';

export const taskReducer: ActionReducerMap<Task_ModuleState> = {

	ui: task_UIReducer

}
