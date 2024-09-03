import { UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// Viewer
export const changeQuote		= createAction('[Quote Viewer] Change Quote', props<{ id: UUID }>());
export const setRunning			= createAction('[Quote Viewer] Set Running', props<{ running: boolean }>());
export const disableAnimation	= createAction('[Quote Viewer] Disable Animation');

// Settings
export const setSelectedId		= createAction('[Quote Settings] Set Selected Id', props<{ id: UUID | null }>());
