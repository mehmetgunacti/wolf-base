import { LocalRepositoryNames, ModuleReport } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const databaseActions = createActionGroup({

	source: 'Database',
	events: {

		backupDatabase		:  emptyProps(),

		loadValues			: props<{ tablename: LocalRepositoryNames }>(),
		loadValuesSuccess	: props<{ selectedValues: string[] }>(),

		search				: props<{ value: string | null }>(),

		loadReport			: emptyProps(),
		loadReportSuccess	: props<{ reports: ModuleReport[] }>()

	}

});
