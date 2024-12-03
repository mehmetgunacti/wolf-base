import { UUID } from '@constants/common.constant';
import { createActionGroup, props } from '@ngrx/store';

export const sessionActions = createActionGroup({

	source: 'Session',
	events: {

		// UI
		setSelectedId	: props<{ id: UUID | null }>()

	}

});
