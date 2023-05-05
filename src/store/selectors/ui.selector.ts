import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from 'store/states/ui.state';

export const uiState = createFeatureSelector<UIState>('ui');

export const themeInfo = createSelector(

	uiState,
	(state: UIState) => state.theme.info

);

export const isBigScreen = createSelector(

	uiState,
	(state: UIState) => state.bigScreen

);
