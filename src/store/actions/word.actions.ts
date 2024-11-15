import { UUID } from '@constants/common.constant';
import { WordQueryParams } from '@models/word.model';
import { createActionGroup, props } from '@ngrx/store';

export const wordActions = createActionGroup({

	source: 'Word',
	events: {

		search			: props<{ term: string | null }>(),
		setSelectedId	: props<{ id: UUID | null }>(),
		setQueryParams	: props<WordQueryParams>()

	}

});
