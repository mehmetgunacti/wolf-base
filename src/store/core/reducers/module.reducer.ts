import { ActionReducerMap } from "@ngrx/store";
import { CoreModuleState } from "store/states/core.state";
import { confReducer } from "./conf.reducer";
import { uiReducer } from "./ui.reducer";

export const coreReducer: ActionReducerMap<CoreModuleState> = {

    conf: confReducer,
    ui: uiReducer

};