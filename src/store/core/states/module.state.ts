import { ConfState, initialConfState } from "./conf.state";
import { UIState, initialUIState } from "./ui.state";

export interface CoreModuleState {

    conf: ConfState;
    ui: UIState;

}

export const initialCoreState: CoreModuleState = {

    conf: initialConfState,
    ui: initialUIState

}