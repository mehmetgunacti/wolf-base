import { initialConfState } from './conf.state';
import { ConfState } from './conf.state';
import { MenuState, initialMenuState } from './menu.state';
import { UIState, initialUIState } from './ui.state';

export interface AppState {

	conf: ConfState;
	ui: UIState;
	menu: MenuState;

}

export const initialAppState: AppState = {

	conf: initialConfState,
	ui: initialUIState,
	menu: initialMenuState

};
