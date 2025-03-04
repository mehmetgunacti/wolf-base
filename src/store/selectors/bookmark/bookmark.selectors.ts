import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Bookmark_ModuleState } from '@states/bookmark.state';

const selBookmark_ModuleState = createFeatureSelector<Bookmark_ModuleState>('bookmark');

export const selBookmark_ClicksState = createSelector(

	selBookmark_ModuleState,
	state => state.clicks

);

export const selBookmark_UIState = createSelector(

	selBookmark_ModuleState,
	state => state.ui

);
