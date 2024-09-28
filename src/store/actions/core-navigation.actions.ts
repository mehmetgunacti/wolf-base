import { createActionGroup, props } from '@ngrx/store';

export const coreNavigationActions = createActionGroup({

	source: 'Core Navigation',
	events: {

		'Navigate' : props<{ url: string[], queryParams?: Record<string, string>, skipLocationChange?: boolean, closeOnNavSuccess?: boolean }>()

	}

});
