import { ModuleReport } from '@models';

export interface DatabaseModuleState {

	reports: ModuleReport[];

}

export const initialDatabaseState: DatabaseModuleState = {

	reports: []

};
