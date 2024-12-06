import { UUID } from '@constants/common.constant';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const sessionActions = createActionGroup({

	source: 'Session',
	events: {

		// UI
		openDialog		: props<{ id: UUID | null }>(),
		closeDialog		: emptyProps(),

	}

});
