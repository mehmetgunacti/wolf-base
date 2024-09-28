import { UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const quoteActions = createActionGroup({

	source: 'Quote',
	events: {

		changeQuote			: props<{ id: UUID }>(),
		setRunning			: props<{ running: boolean }>(),
		disableAnimation	: emptyProps(),

		setSelectedId		: props<{ id: UUID | null }>()

	}

});
