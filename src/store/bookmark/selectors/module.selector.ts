import { createFeatureSelector } from '@ngrx/store';
import { BookmarkModuleState } from 'store/states/bookmark.state';

export const selectorModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');