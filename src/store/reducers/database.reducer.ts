import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { loadValuesSuccess, search } from "store/actions/database.actions";
import { DatabaseModuleState, initialDatabaseState } from "store/states/database.state";

export const databaseReducer: ActionReducer<DatabaseModuleState, Action> = createReducer(

	initialDatabaseState,
	on(loadValuesSuccess, (state, { selectedValues }): DatabaseModuleState => ({ ...state, selectedValues })),
	on(search, (state, { value }): DatabaseModuleState => ({ ...state, searchValue: value })),

);