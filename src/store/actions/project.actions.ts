import { ProjectQueryParams, UUID } from '@lib';
import { createActionGroup, props } from '@ngrx/store';

export const projectActions = createActionGroup({

	source: 'Project',
	events: {

		// UI
		'Set Selected Id'		: props<{ id: UUID | null }>(),
		'Search'				: props<{ term: string | null }>(),
		'Set Query Params'		: props<ProjectQueryParams>()

	}

});
