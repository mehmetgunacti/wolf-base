import { UUID } from '@constants/common.constant';
import { LogCategory } from '@constants/log.constant';
import { LogMessage } from '@models/log.model';
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
