import { Exam } from '@models/test-suite.model';
import { createSelector } from '@ngrx/store';
import { selExam_EntityMap } from '../entity/entity-exam.selectors';
import { selExam_UIState } from './exam.selectors';

// SELECTED ID
const selExam_SelectedId = createSelector(

	selExam_UIState,
	state => state.selectedId

);

export const selExam_selected = createSelector(

	selExam_EntityMap,
	selExam_SelectedId,
	(state, id): Exam | null => id ? state[ id ] ?? null : null

);
