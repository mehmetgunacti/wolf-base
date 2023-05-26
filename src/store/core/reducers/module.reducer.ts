import { ActionReducerMap } from "@ngrx/store";
import { CoreModuleState } from "../states";
import { confReducer } from "./conf.reducer";
import { uiReducer } from "./ui.reducer";
import { menuReducer } from "./menu.reducer";

export const coreReducer: ActionReducerMap<CoreModuleState> = {

    conf: confReducer,
    ui: uiReducer,
    menu: menuReducer

};