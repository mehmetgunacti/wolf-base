import { UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const quoteActions = createActionGroup({

	source: 'Quote',
	events: {

		'Change Quote'		: props<{ id: UUID }>(),
		'Set Running'		: props<{ running: boolean }>(),
		'Disable Animation'	: emptyProps(),

		'Set Selected Id'	: props<{ id: UUID | null }>()

	}

});
