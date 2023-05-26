import { createFeatureSelector } from '@ngrx/store';
import { BookmarkModuleState } from '../states';

export const selectorModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');