import { Exam } from '@models/test-suite.model';
import { createSelector } from '@ngrx/store';
import { selExam_EntityMap } from '@selectors/entity/entity-exam.selectors';
import { selSession_UIState } from './session.selectors';

// SELECTED ID
const selSession_examId = createSelector(

	selSession_UIState,
	state => state.examId

);

export const selSession_exam = createSelector(

	selExam_EntityMap,
	selSession_examId,
	(state, id): Exam | null => id ? state[ id ] ?? null : null

);

export const selSession_dialogVisible = createSelector(

	selSession_UIState,
	state => state.dialogVisible

);
