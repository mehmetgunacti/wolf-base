import { ActionReducerMap } from "@ngrx/store";
import { Project_ModuleState } from "store/states/project.state";
import { project_EntitiesReducer } from "./project-entities.reducer";
import { project_UIReducer } from "./project-ui.reducer";

export const projectReducer: ActionReducerMap<Project_ModuleState> = {

	entities: project_EntitiesReducer,
	ui: project_UIReducer

}
