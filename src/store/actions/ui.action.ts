import { createAction, props } from '@ngrx/store';
import { ThemeInfo, LANG } from 'lib';

export const themeSet = createAction('[UI] Set Theme', props<{ newTheme: ThemeInfo }>());

export const i18nSetLanguage = createAction('[UI] i18n Set Language', props<{ newLang: LANG }>());
export const i18nSaveTranslations = createAction('[UI] i18n Save Translations', props<{ translations: any }>());

export const setBigScreen = createAction('[UI] Set Big Screen', props<{ isBigScreen: boolean }>());
