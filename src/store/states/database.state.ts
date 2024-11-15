import { ModuleReport } from '@models/database.model';

export interface DatabaseModuleState {

	reports: ModuleReport[];

}

export const initialDatabaseState: DatabaseModuleState = {

	reports: []

};
