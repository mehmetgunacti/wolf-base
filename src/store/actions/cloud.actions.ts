import { createActionGroup, emptyProps } from '@ngrx/store';

export const cloudActions = createActionGroup({

	source: 'Cloud',
	events: {

		openConflictDialog		: emptyProps(),
		closeConflictDialog		: emptyProps(),

	}

});
