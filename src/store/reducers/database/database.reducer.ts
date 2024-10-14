import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { databaseActions } from '@actions';
import { DatabaseModuleState, initialDatabaseState } from 'store/states/database.state';

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
	on(databaseActions.emptyTableSuccess, (state, { table }): DatabaseModuleState => {

		return produce(

			state,
			draft => {

				draft.reports
					.flatMap(r => r.reports)
					.forEach(m => {

						if (m.table === table) {
							m.size = 0;
							m.count = 0;
						}

					});

			}

		);

	})

);
