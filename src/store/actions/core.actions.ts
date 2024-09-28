import { Configuration, Theme, ToastConfiguration } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const coreActions = createActionGroup({

	source: 'Core',
	events: {

		'Load All'					: emptyProps(),
		'Load All Success'			: props<{ configuration: Configuration }>(),

		'Set Big Screen'			: props<{ bigScreen: boolean }>(),
		'Hide Sidebar'				: emptyProps(),
		'Set Next Sidebar State'	: emptyProps(),

		'Set Theme'					: props<{ theme: Theme }>(),
		'Set Now'					: emptyProps(),

		'Show Notification'			: props<ToastConfiguration>(),

		'Navigate' 					: props<{ url: string[], queryParams?: Record<string, string>, skipLocationChange?: boolean, closeOnNavSuccess?: boolean }>()

	}

});
