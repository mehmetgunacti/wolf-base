import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkModuleState } from 'store/states/bookmark.state';

const sltBookmarkModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');

export const sltBookmarkEntitiesState = createSelector(

    sltBookmarkModuleState,
    state => state.entities

);

export const sltBookmarkUIState = createSelector(

    sltBookmarkModuleState,
    state => state.ui

);

export const sltBookmarkTagsState = createSelector(

    sltBookmarkModuleState,
    state => state.tags

);

export const sltBookmarkSyncState = createSelector(

    sltBookmarkModuleState,
    state => state.sync

);