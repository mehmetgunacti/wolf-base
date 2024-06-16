import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DatabaseModuleState } from 'store/states/database.state';

const selDatabaseModuleState = createFeatureSelector<DatabaseModuleState>('database');

export const selDatabaseReport = createSelector(

	selDatabaseModuleState,
	state => state.report

);
