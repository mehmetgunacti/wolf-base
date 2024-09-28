import { ProjectQueryParams, UUID } from '@lib';
import { createActionGroup, props } from '@ngrx/store';

export const projectActions = createActionGroup({

	source: 'Project',
	events: {

		// UI
		setSelectedId	: props<{ id: UUID | null }>(),
		search			: props<{ term: string | null }>(),
		setQueryParams	: props<ProjectQueryParams>()

	}

});
