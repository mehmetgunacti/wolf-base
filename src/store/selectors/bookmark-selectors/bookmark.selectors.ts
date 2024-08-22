import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkModuleState } from 'store/states/bookmark.state';
import { selEntity_ModuleState } from '../entity-selectors/entity.selectors';

const selBookmark_ModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');

export const selBookmark_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.bookmark

);

export const selBookmark_ClicksState = createSelector(

	selBookmark_ModuleState,
	state => state.clicks

);

export const selBookmark_UIState = createSelector(

	selBookmark_ModuleState,
	state => state.ui

);
