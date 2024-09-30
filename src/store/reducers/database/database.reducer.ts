import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { produce } from 'immer';
import { databaseActions } from 'store/actions';
import { DatabaseModuleState, initialDatabaseState } from "store/states/database.state";

export const databaseReducer: ActionReducer<DatabaseModuleState, Action> = createReducer(

	initialDatabaseState,
	on(databaseActions.loadReport, (state): DatabaseModuleState => ({ ...state, reports: [] })),
	on(databaseActions.loadReportSuccess, (state, { reports }): DatabaseModuleState => {

		return produce(

			state,
			draft => {
				draft.reports = reports;
			}

		);

	}),

);
