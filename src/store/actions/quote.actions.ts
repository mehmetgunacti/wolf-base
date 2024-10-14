import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UUID } from '@constants';

export const quoteActions = createActionGroup({

	source: 'Quote',
	events: {

		changeQuote			: props<{ id: UUID }>(),
		setRunning			: props<{ running: boolean }>(),
		disableAnimation	: emptyProps(),

		setSelectedId		: props<{ id: UUID | null }>()

	}

});
