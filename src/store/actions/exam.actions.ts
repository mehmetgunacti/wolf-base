import { UUID } from '@constants/common.constant';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const examActions = createActionGroup({

	source: 'Exam',
	events: {

		// UI
		openFormDialog			: emptyProps(),
		openEditDialog			: props<{ id: UUID }>(),
		closeEditDialog			: emptyProps(),

		openDetailsDialog		: props<{ id: UUID }>(),
		closeDetailsDialog		: emptyProps(),

		editSuccess		: emptyProps()

	}

});
