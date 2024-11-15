import { quizEntryActions } from '@actions/quiz-entry.actions';
import { incVisibility, QuizVisibility } from '@constants/quiz.constant';
import { Action, createReducer, on } from '@ngrx/store';
import { quizEntry_initialUIState, QuizEntry_UIState } from '@states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(quizEntryActions.editWord, (state): QuizEntry_UIState => ({

		...state,
		answer: null

	})),
	on(quizEntryActions.hideAnswer, (state): QuizEntry_UIState => ({

		...state,
		answer: null

	})),
	on(quizEntryActions.answeredWrong, (state, { word }): QuizEntry_UIState => ({

		...state,
		answer: word,
		visibility: QuizVisibility.HEADER

	})),
	on(quizEntryActions.answeredRight, (state): QuizEntry_UIState => ({

		...state,
		answer: null,
		visibility: QuizVisibility.HEADER

	})),
	on(quizEntryActions.expand, (state): QuizEntry_UIState => ({

		...state,
		visibility: incVisibility(state.visibility)

	})),
	on(quizEntryActions.collapseAll, (state): QuizEntry_UIState => ({

		...state,
		visibility: QuizVisibility.HEADER

	}))

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
