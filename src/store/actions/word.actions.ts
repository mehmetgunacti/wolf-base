import { createActionGroup, props } from '@ngrx/store';
import { UUID } from '@constants';
import { WordQueryParams } from '@models';

export const wordActions = createActionGroup({

	source: 'Word',
	events: {

		search			: props<{ term: string | null }>(),
		setSelectedId	: props<{ id: UUID | null }>(),
		setQueryParams	: props<WordQueryParams>()

	}

});
