import { UUID } from '@constants/common.constant';
import { DbStore, LocalRepositoryNames } from '@constants/database.constant';
import { ModuleReport } from '@models/database.model';
import { IdBase } from '@models/id-base.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const databaseActions = createActionGroup({

	source: 'Database',
	events: {

		backupDatabase		: emptyProps(),

		loadValues			: props<{ tablename: LocalRepositoryNames }>(),
		loadValuesSuccess	: props<{ selectedValues: string[] }>(),

		search				: props<{ value: string | null }>(),

		loadReport			: emptyProps(),
		loadReportSuccess	: props<{ reports: ModuleReport[] }>(),

		emptyTable			: props<{ table: string }>(),
		emptyTableSuccess	: props<{ table: string }>(),

		setSelected				: props<{ entity: IdBase | null }>(),
		readFromStore			: props<{ id: UUID, name: DbStore }>(),
		deleteFromStore			: props<{ id: UUID, name: DbStore }>(),
		deleteFromStoreSuccess	: emptyProps()

	}

});
