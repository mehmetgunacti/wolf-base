import { DatabaseReport, LocalRepositoryNames } from '@lib';
import { createAction, props } from "@ngrx/store";

export const backupDatabase = createAction('[Database] Backup Database');

export const loadValues = createAction('[Database] Load Values', props<{ tablename: LocalRepositoryNames }>());
export const loadValuesSuccess = createAction('[Database] Load Values Success', props<{ selectedValues: string[] }>());

export const search = createAction('[Database] Search Value', props<{ value: string | null }>());

export const loadReport = createAction('[Database] Load Report');
export const loadReportSuccess = createAction('[Database] Load Report Success', props<{ report: DatabaseReport }>());
