import { createSelector } from '@ngrx/store';
import { selExam_EntityMap } from '../entity/entity-exam.selectors';
import { selExam_UIState } from './exam.selectors';

export const selExam_editEntity = createSelector(

	selExam_EntityMap,
	selExam_UIState,
	(entities, uiState) => uiState.editId ? entities[ uiState.editId ] : null

);

export const selExam_formVisible = createSelector(

	selExam_UIState,
	state => state.formVisible

);
