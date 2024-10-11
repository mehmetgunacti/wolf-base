import { ModuleReport } from '@lib';

export interface DatabaseModuleState {

	reports: ModuleReport[];

}

export const initialDatabaseState: DatabaseModuleState = {

	reports: []

};
