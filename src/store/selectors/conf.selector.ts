import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfState } from 'store/states';

export const confState = createFeatureSelector<ConfState>('conf');

export const isSidebarVisible = createSelector(

	confState,
	(state: ConfState) => state.sidebarVisible

);
