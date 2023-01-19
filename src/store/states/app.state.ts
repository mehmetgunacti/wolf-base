import { UIState, initialUIState } from './ui.state';

export interface AppState {

	ui: UIState;

}

export const initialAppState: AppState = {

	ui: initialUIState

};
