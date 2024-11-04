import { QuizVisibility } from '@constants';
import { Word } from '@models';

export interface QuizEntry_ModuleState {

	ui: QuizEntry_UIState;

}

export interface QuizEntry_UIState {

	answer: Word | null;
	visibility: QuizVisibility;

}

// INITIALIZATION

export const quizEntry_initialUIState: QuizEntry_UIState = {

	answer: null,
	visibility: QuizVisibility.HEADER

};

export const quizEntry_initialModuleState: QuizEntry_ModuleState = {

	ui: quizEntry_initialUIState

};
