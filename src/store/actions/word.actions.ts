import { UUID, WordQueryParams } from '@lib';
import { createActionGroup, props } from '@ngrx/store';

export const wordActions = createActionGroup({

	source: 'Word',
	events: {

		'Search'			: props<{ term: string | null }>(),
		'SetSelectedId'		: props<{ id: UUID | null }>(),
		'SetQueryParams'	: props<WordQueryParams>()

	}

});
