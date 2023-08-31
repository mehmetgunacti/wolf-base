import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selStatsModuleState } from "./stats.selectors";
import { DatabaseModuleState } from "store/states/database.state";

const selDatabaseModuleState = createFeatureSelector<DatabaseModuleState>('database');

const selDatabaseSelectedValues = createSelector(

	selDatabaseModuleState,
	state => state.selectedValues

);

const selDatabaseSearchValue = createSelector(

	selDatabaseModuleState,
	state => state.searchValue

);

export const selDatabaseSelectedContent = createSelector(

	selDatabaseSelectedValues,
	selDatabaseSearchValue,
	(values, search) => search ? values.filter(v => v.toLowerCase().includes(search.toLowerCase())) : values

);