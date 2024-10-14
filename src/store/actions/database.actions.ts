import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LocalRepositoryNames } from '@constants';
import { ModuleReport } from '@models';

export const databaseActions = createActionGroup({

	source: 'Database',
	events: {

		backupDatabase		:  emptyProps(),

		loadValues			: props<{ tablename: LocalRepositoryNames }>(),
		loadValuesSuccess	: props<{ selectedValues: string[] }>(),

		search				: props<{ value: string | null }>(),

		loadReport			: emptyProps(),
		loadReportSuccess	: props<{ reports: ModuleReport[] }>(),

		emptyTable			: props<{ table: string }>(),
		emptyTableSuccess	: props<{ table: string }>()

	}

});
