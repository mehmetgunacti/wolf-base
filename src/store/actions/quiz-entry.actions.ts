import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UUID } from '@constants';
import { Word } from '@models';

export const quizEntryActions = createActionGroup({

	source: 'Quiz Entry',
	events: {

		// UI
		answeredRight: props<{ quizEntryId: UUID; }>(),
		answeredWrong: props<{ word: Word; }>(),

		closeAnswerDialog: props<{ quizEntryId: UUID, editWord?: UUID; }>(),
		increaseVisibility: emptyProps()

	}

});
