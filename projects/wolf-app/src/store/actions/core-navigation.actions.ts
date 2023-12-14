import { createAction, props } from '@ngrx/store';

export const navigate = createAction('[Navigation] Navigate', props<{ url: string, skipLocationChange?: boolean, closeOnNavSuccess?: boolean }>());
// export const navigateSuccess = createAction('[Navigation] Navigate Success');
