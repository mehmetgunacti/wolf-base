import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Quote_ModuleState } from 'store/states/quote.state';
import { selEntity_ModuleState } from '../entity-selectors/entity.selectors';

const selQuote_ModuleState = createFeatureSelector<Quote_ModuleState>('quote');

export const selQuote_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.quote

);

export const selQuote_SettingsState = createSelector(

	selQuote_ModuleState,
	state => state.settings

);

export const selQuote_ViewerState = createSelector(

	selQuote_ModuleState,
	state => state.viewer

);
