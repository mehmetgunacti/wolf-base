import { LogCategory, LogMessage, UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const logActions = createActionGroup({

	source: 'Log',
	events: {

		load			: props<{ selectedId: UUID | null, categories: LogCategory[], limit?: number }>(),
		loadSuccess		: props<{ logs: LogMessage[] }>(),

		refresh			: emptyProps(),

		clearLogs		: emptyProps(),

		setSelectedId	: props<{ id: UUID | null }>()

	}

});
