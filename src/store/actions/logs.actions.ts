import { LogCategory, LogMessage, UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const logActions = createActionGroup({

	source: 'Log',
	events: {

		'Load'				: props<{ selectedId: UUID | null, categories: LogCategory[], limit?: number }>(),
		'Load Success'		: props<{ logs: LogMessage[] }>(),

		'Refresh'			: emptyProps(),

		'Clear Logs'		: emptyProps(),

		'Set Selected Id'	: props<{ id: UUID | null }>()

	}

});
