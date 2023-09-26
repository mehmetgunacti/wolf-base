import { createAction, props } from "@ngrx/store";
import { LocalTableNames } from "lib";

export const backupDatabase = createAction('[Database] Backup Database');

export const loadValues = createAction('[Database] Load Values', props<{ tablename: LocalTableNames }>());
export const loadValuesSuccess = createAction('[Database] Load Values Success', props<{ selectedValues: string[] }>());

export const search = createAction('[Database] Search Value', props<{ value: string | null }>());