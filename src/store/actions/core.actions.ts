import { Configuration } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const coreActions = createActionGroup({

	source: 'Core',
	events: {

		'Load All'			: emptyProps(),
		'Load All Success'	: props<{ configuration: Configuration }>()

	}

});
