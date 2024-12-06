import { UUID } from '@constants/common.constant';

export interface Session_ModuleState {

	ui: Session_UIState;

}

export interface Session_UIState {

	examId: UUID | null;
	dialogVisible: boolean;

}

// INITIALIZATION

export const session_initialUIState: Session_UIState = {

	examId: null,
	dialogVisible: false

};

export const session_initialModuleState: Session_ModuleState = {

	ui: session_initialUIState

};
