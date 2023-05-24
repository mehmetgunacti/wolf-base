import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from 'store/states';

export const menuState = createFeatureSelector<MenuState>('menu');

export const totalBookmarksCount = createSelector(

	menuState,
	(state: MenuState) => state.totalBookmarksCount

);

export const selectedBookmarksCount = createSelector(

	menuState,
	(state: MenuState) => state.selectedBookmarksCount

);
