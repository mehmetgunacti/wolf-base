import { ActionReducerMap } from '@ngrx/store';
import { Exam_ModuleState } from '@states/exam.state';
import { exam_UIReducer } from './exam-ui.reducer';

export const examReducer: ActionReducerMap<Exam_ModuleState> = {

	ui: exam_UIReducer

};
