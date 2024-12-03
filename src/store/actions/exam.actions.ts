import { UUID } from '@constants/common.constant';
import { createActionGroup, props } from '@ngrx/store';

export const examActions = createActionGroup({

	source: 'Exam',
	events: {

		// UI
		setSelectedId	: props<{ id: UUID | null }>()

	}

});
