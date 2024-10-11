import { QuizVisibility, Word } from '@lib';

export interface QuizEntry_ModuleState {

	ui: QuizEntry_UIState;

}

export interface QuizEntry_UIState {

	now: number;
	answer: Word | null;
	visibility: QuizVisibility;

}

// INITIALIZATION

export const quizEntry_initialUIState: QuizEntry_UIState = {

	now: new Date().getTime(),
	answer: null,
	visibility: QuizVisibility.HEADER

};

export const quizEntry_initialModuleState: QuizEntry_ModuleState = {

	ui: quizEntry_initialUIState

};
