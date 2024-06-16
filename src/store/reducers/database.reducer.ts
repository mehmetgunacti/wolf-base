import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { produce } from 'immer';
import { loadReportSuccess } from 'store/actions/database.actions';
import { DatabaseModuleState, initialDatabaseState } from "store/states/database.state";

export const databaseReducer: ActionReducer<DatabaseModuleState, Action> = createReducer(

	initialDatabaseState,
	on(loadReportSuccess, (state, { report }): DatabaseModuleState => {

		return produce(

			state,
			draft => {
				draft.report = report;
			}

		);

	}),

);
