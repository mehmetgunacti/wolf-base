import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Database_ModuleState } from '@states/database.state';

const selDatabaseModuleState = createFeatureSelector<Database_ModuleState>('database');

export const selDatabase_Report = createSelector(

	selDatabaseModuleState,
	state => state.reports

);
