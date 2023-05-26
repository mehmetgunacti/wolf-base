import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkModuleState } from '../states';

const selectorModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');

const selectorUIState = createSelector(
	selectorModuleState,
	state => state.ui
)

export const selectorTagCloudVisibility = createSelector(
	selectorUIState,
	state => state.tagCloudVisible
);
