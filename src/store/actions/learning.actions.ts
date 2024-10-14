import { createActionGroup, props } from '@ngrx/store';
import { UUID } from '@constants';
import { TestSuiteQueryParams } from '@models';

export const learningActions = createActionGroup({

	source: 'Learning',
	events: {

		// UI
		setSelectedId	: props<{ id: UUID | null }>(),
		search			: props<{ term: string | null }>(),
		setQueryParams	: props<TestSuiteQueryParams>()

	}

});
