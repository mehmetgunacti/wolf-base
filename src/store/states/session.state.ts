import { UUID } from '@constants/common.constant';

export interface Session_ModuleState {

	ui: Session_UIState;

}

export interface Session_UIState {

	selectedId: UUID | null;

}

// INITIALIZATION

export const session_initialUIState: Session_UIState = {

	selectedId: null

};

export const session_initialModuleState: Session_ModuleState = {

	ui: session_initialUIState

};
