import { ConfState, initialConfState } from "./conf.state";
import { MenuState, initialMenuState } from "./menu.state";
import { UIState, initialUIState } from "./ui.state";

export interface CoreModuleState {

    conf: ConfState;
    ui: UIState;
    menu: MenuState;

}

export const initialCoreState: CoreModuleState = {

    conf: initialConfState,
    ui: initialUIState,
    menu: initialMenuState

}