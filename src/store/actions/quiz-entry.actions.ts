import { UUID, Word } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const quizEntryActions = createActionGroup({

	source: 'Quiz Entry',
	events: {

		// UI
		'Answered Right'		: props<{ quizEntryId: UUID }>(),
		'Answered Wrong'		: props<{ word: Word }>(),

		'Close Answer Dialog'	: props<{ quizEntryId: UUID, editWord?: UUID }>(),
		'Increase Visibility'	: emptyProps()

	}

});
