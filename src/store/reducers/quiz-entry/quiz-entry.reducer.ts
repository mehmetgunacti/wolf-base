import { ActionReducerMap } from '@ngrx/store';
import { QuizEntry_ModuleState } from 'store/states/quiz-entry.state';
import { quizEntry_UIReducer } from './quiz-entry-ui.reducer';

export const quizEntryReducer: ActionReducerMap<QuizEntry_ModuleState> = {

	ui: quizEntry_UIReducer

}
