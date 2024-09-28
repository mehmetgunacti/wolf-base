import { createActionGroup, emptyProps } from '@ngrx/store';

export const cloudActions = createActionGroup({

	source: 'Cloud',
	events: {

		'Open Conflict Dialog'		: emptyProps(),
		'Close Conflict Dialog'	: emptyProps(),

	}

});
