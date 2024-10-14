import { createActionGroup, props } from '@ngrx/store';
import { UUID } from '@constants';
import { ProjectQueryParams } from '@models';

export const projectActions = createActionGroup({

	source: 'Project',
	events: {

		// UI
		setSelectedId	: props<{ id: UUID | null }>(),
		search			: props<{ term: string | null }>(),
		setQueryParams	: props<ProjectQueryParams>()

	}

});
