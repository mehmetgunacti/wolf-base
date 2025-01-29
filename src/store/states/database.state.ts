import { DbStore } from '@constants/database.constant';
import { ModuleReport } from '@models/database.model';
import { IdBase } from '@models/id-base.model';

export interface Database_ModuleState {

	reports: ModuleReport[];
	selectedStore: DbStore | null;
	entity: IdBase | null;

}

export const database_initialState: Database_ModuleState = {

	reports: [],
	selectedStore: null,
	entity: null

};
