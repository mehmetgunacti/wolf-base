import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Quote_ModuleState } from 'store/states/quote.state';

const selQuote_ModuleState = createFeatureSelector<Quote_ModuleState>('quote');

export const selQuote_EntitiesState = createSelector(

	selQuote_ModuleState,
	state => state.entities

);

export const selQuote_UIState = createSelector(

	selQuote_ModuleState,
	state => state.ui

);
