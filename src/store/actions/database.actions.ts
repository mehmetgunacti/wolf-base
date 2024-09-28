import { DatabaseReport, LocalRepositoryNames } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const databaseActions = createActionGroup({

	source: 'Database',
	events: {

		'Backup Database'		:  emptyProps(),

		'Load Values'			: props<{ tablename: LocalRepositoryNames }>(),
		'Load Values Success'	: props<{ selectedValues: string[] }>(),

		'Search'				: props<{ value: string | null }>(),

		'Load Report'			: emptyProps(),
		'Load Report Success'	: props<{ report: DatabaseReport }>()

	}

});
