import { databaseActions } from '@actions/database.actions';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { Database_ModuleState, database_initialState } from 'store/states/database.state';

export const databaseReducer: ActionReducer<Database_ModuleState, Action> = createReducer(

	database_initialState,
	on(databaseActions.loadReport, (state): Database_ModuleState => ({ ...state, reports: [] })),
	on(databaseActions.loadReportSuccess, (state, { reports }): Database_ModuleState => {

		return produce(

			state,
			draft => {
				draft.reports = reports;
			}

		);

	}),
	on(databaseActions.emptyTableSuccess, (state, { table }): Database_ModuleState => {

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

	}),
	on(databaseActions.setSelected, (state, { entity }) => ({ ...state, entity }))

);
