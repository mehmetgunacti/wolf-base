import { UUID } from '@constants/common.constant';
import { TestSuiteQueryParams } from '@models/learning.model';
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
