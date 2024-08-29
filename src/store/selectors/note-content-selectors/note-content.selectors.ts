import { createSelector } from '@ngrx/store';
import { selEntity_ModuleState } from '../entity-selectors/entity.selectors';

export const selNoteContent_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.noteContent

);
