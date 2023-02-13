import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import {
	themeSet,
	i18nSetLanguage,
	i18nSaveTranslations
} from 'store/actions/ui.action';
import { initialUIState, UIState } from 'store/states/ui.state';
import * as utils from 'utils';

export const uiReducer: ActionReducer<UIState, Action> = createReducer(

	initialUIState,
	on(themeSet, (state, params) => {

		return produce(
			state,
			draft => new utils.ThemeHandler(state, draft).setNewTheme(params['newTheme'])
		);

	}),
	on(i18nSetLanguage, (state, { newLang }) => {

		return produce(
			state,
			draft => {

				// move this to effects
				localStorage.setItem('lang', newLang);
				draft.lang = newLang;

			}
		);

	}),
	on(i18nSaveTranslations, (state, { translations }) => {

		return produce(
			state,
			draft => { draft.translations = translations }
		);

	})

);
