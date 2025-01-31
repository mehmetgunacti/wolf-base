import { UUID } from '@constants/common.constant';
import { createActionGroup, props } from '@ngrx/store';

export const testSuiteActions = createActionGroup({

	source: 'TestSuite',
	events: {

		// UI
		setSelectedId	: props<{ id: UUID | null, examId: UUID | null }>()

	}

});
