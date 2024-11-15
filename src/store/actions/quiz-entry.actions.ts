import { UUID } from '@constants/common.constant';
import { Word } from '@models/word.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const quizEntryActions = createActionGroup({

	source: 'Quiz Entry',
	events: {

		answeredRight: props<{ quizEntryId: UUID; }>(),
		answeredWrong: props<{ word: Word; }>(),

		editWord: props<{ wordId: UUID; }>(),

		// UI
		expand: emptyProps(),
		collapseAll: emptyProps(),
		hideAnswer: emptyProps()

	}

});
