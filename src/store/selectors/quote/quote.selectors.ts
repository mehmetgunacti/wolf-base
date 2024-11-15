import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Quote_ModuleState } from '@states/quote.state';

const selQuote_ModuleState = createFeatureSelector<Quote_ModuleState>('quote');

export const selQuote_SettingsState = createSelector(

	selQuote_ModuleState,
	state => state.settings

);

export const selQuote_ViewerState = createSelector(

	selQuote_ModuleState,
	state => state.viewer

);
