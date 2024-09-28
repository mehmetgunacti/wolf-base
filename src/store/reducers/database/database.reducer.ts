import { emptyDatabaseReport } from '@lib';
import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { produce } from 'immer';
import { databaseActions } from 'store/actions';
import { DatabaseModuleState, initialDatabaseState } from "store/states/database.state";

export const databaseReducer: ActionReducer<DatabaseModuleState, Action> = createReducer(

	initialDatabaseState,
	on(databaseActions.loadReport, (state): DatabaseModuleState => ({ ...state, report: emptyDatabaseReport })),
	on(databaseActions.loadReportSuccess, (state, { report }): DatabaseModuleState => {

		return produce(

			state,
			draft => {
				draft.report = report;
			}

		);

	}),

);
