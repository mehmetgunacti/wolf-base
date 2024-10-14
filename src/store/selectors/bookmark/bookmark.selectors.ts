import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkModuleState } from '@states';

const selBookmark_ModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');

export const selBookmark_ClicksState = createSelector(

	selBookmark_ModuleState,
	state => state.clicks

);

export const selBookmark_UIState = createSelector(

	selBookmark_ModuleState,
	state => state.ui

);
