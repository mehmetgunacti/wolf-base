import { ModuleReport } from '@models/database.model';

export interface Database_ModuleState {

	reports: ModuleReport[];

}

export const database_initialState: Database_ModuleState = {

	reports: []

};
