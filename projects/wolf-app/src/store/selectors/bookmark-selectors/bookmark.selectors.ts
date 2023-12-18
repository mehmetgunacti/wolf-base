import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkModuleState } from 'store/states/bookmark.state';

const selBookmarkModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');

export const selBookmarkEntitiesState = createSelector(

	selBookmarkModuleState,
	state => state.entities

);

export const selBookmarkUIState = createSelector(

	selBookmarkModuleState,
	state => state.ui

);
