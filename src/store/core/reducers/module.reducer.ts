import { ActionReducerMap } from "@ngrx/store";
import { CoreModuleState } from "../states";
import { confReducer } from "./conf.reducer";
import { uiReducer } from "./ui.reducer";

export const coreReducer: ActionReducerMap<CoreModuleState> = {

    conf: confReducer,
    ui: uiReducer

};