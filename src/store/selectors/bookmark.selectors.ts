import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkModuleState } from 'store/states/bookmark.state';

const selectorBookmarkModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');

export const selectorBookmarkEntitiesState = createSelector(

    selectorBookmarkModuleState,
    state => state.entities

);

export const selectorBookmarkUIState = createSelector(

    selectorBookmarkModuleState,
    state => state.ui

);

export const selectorBookmarkTagsState = createSelector(

    selectorBookmarkModuleState,
    state => state.tags

);

export const selectorBookmarkSyncState = createSelector(

    selectorBookmarkModuleState,
    state => state.sync

);