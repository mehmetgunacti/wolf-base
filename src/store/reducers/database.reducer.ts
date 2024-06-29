import { emptyDatabaseReport } from '@lib';
import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { produce } from 'immer';
import { loadReport, loadReportSuccess } from 'store/actions/database.actions';
import { DatabaseModuleState, initialDatabaseState } from "store/states/database.state";

export const databaseReducer: ActionReducer<DatabaseModuleState, Action> = createReducer(

	initialDatabaseState,
	on(loadReport, (state): DatabaseModuleState => ({ ...state, report: emptyDatabaseReport })),
	on(loadReportSuccess, (state, { report }): DatabaseModuleState => {

		return produce(

			state,
			draft => {
				draft.report = report;
			}

		);

	}),

);
