import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Exam_ModuleState } from '@states/exam.state';

const selExam_ModuleState = createFeatureSelector<Exam_ModuleState>('exam');

export const selExam_UIState = createSelector(

	selExam_ModuleState,
	state => state.ui

);
