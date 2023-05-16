import { initialConfState } from './conf.state';
import { ConfState } from './conf.state';
import { UIState, initialUIState } from './ui.state';

export interface AppState {

	conf: ConfState;
	ui: UIState;

}

export const initialAppState: AppState = {

	conf: initialConfState,
	ui: initialUIState

};
