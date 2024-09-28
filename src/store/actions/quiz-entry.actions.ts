import { UUID, Word } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const quizEntryActions = createActionGroup({

	source: 'Quiz Entry',
	events: {

		// UI
		answeredRight		: props<{ quizEntryId: UUID }>(),
		answeredWrong		: props<{ word: Word }>(),

		closeAnswerDialog	: props<{ quizEntryId: UUID, editWord?: UUID }>(),
		increaseVisibility	: emptyProps()

	}

});
