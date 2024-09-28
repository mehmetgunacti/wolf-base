import { Theme } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const coreUIActions = createActionGroup({

	source: 'Core UI',
	events: {

		'Set Big Screen'			: props<{ bigScreen: boolean }>(),
		'Hide Sidebar'				: emptyProps(),
		'Set Next Sidebar State'	: emptyProps(),

		'Set Theme'					: props<{ theme: Theme }>(),
		'Set Now'					: emptyProps(),

	}

});
