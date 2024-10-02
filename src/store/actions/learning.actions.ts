import { TestSuiteQueryParams, UUID } from '@lib';
import { createActionGroup, props } from '@ngrx/store';

export const learningActions = createActionGroup({

	source: 'Learning',
	events: {

		// UI
		setSelectedId	: props<{ id: UUID | null }>(),
		search			: props<{ term: string | null }>(),
		setQueryParams	: props<TestSuiteQueryParams>()

	}

});
