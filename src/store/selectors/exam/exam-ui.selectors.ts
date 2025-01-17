import { createSelector } from '@ngrx/store';
import { selExam_EntityList, selExam_EntityMap } from '../entity/entity-exam.selectors';
import { selExam_UIState } from './exam.selectors';
import { selTestSuite_selected } from '@selectors/test-suite/test-suite-ui.selectors';
import { selSession_EntityList } from '@selectors/entity/entity-session.selectors';

export const selExam_editEntity = createSelector(

	selExam_EntityMap,
	selExam_UIState,
	(entities, uiState) => uiState.editId ? entities[ uiState.editId ] : null

);

export const selExam_detailsEntity = createSelector(

	selExam_EntityMap,
	selExam_UIState,
	(entities, uiState) => uiState.detailsId ? entities[ uiState.detailsId ] : null

);

export const selExam_detailsSessions = createSelector(

	selExam_detailsEntity,
	selSession_EntityList,
	(exam, session) => exam ? session.filter(s => s.exam.id === exam.id) : []

);

export const selExam_formVisible = createSelector(

	selExam_UIState,
	state => state.formVisible

);

export const selExam_detailsVisible = createSelector(

	selExam_UIState,
	state => state.detailsVisible

);

export const selExam_selectedExams = createSelector(

	selExam_EntityList,
	selTestSuite_selected,
	(list, testSuite) => testSuite === null ? [] : list.filter(e => e.testSuite.id === testSuite.id)

);
