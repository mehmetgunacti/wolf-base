import { ActionReducerMap } from '@ngrx/store';
import { Quote_ModuleState } from 'store/states/quote.state';
import { quote_SettingsReducer } from './quote-settings.reducer';
import { quote_ViewerReducer } from './quote-viewer.reducer';

export const quoteReducer: ActionReducerMap<Quote_ModuleState> = {

	viewer: quote_ViewerReducer,
	settings: quote_SettingsReducer

}
