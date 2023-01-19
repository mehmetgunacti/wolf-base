import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from 'store/states/ui.state';

export const uiState = createFeatureSelector<UIState>('ui');

export const themeInfo = createSelector(

	uiState,
	(state: UIState) => state.theme.info

);

export const lang = createSelector(

	uiState,
	(state: UIState) => state.lang

);

export const translations = createSelector(

	uiState,
	(state: UIState) => state.translations

);
