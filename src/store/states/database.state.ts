import { DatabaseReport, emptyDatabaseReport } from '@lib';

export interface DatabaseModuleState {

	report: DatabaseReport;

}

export const initialDatabaseState: DatabaseModuleState = {

	report: emptyDatabaseReport

};
