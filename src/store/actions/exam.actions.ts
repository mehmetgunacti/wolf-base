import { UUID } from '@constants/common.constant';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const examActions = createActionGroup({

	source: 'Exam',
	events: {

		// UI
		openFormDialog				: emptyProps(),
		openEditDialog				: props<{ id: UUID }>(),
		closeDialog					: emptyProps(),

		editSuccess		: emptyProps()

	}

});
