import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Entity_ModuleState } from '@states/entity.state';

export const selEntity_ModuleState = createFeatureSelector<Entity_ModuleState>('entities');

export const selEntity_storeEmpty = createSelector(

	selEntity_ModuleState,
	(state): boolean => {

		return Object.keys(state.bookmark.entities).length === 0 &&
			Object.keys(state.exam.entities).length === 0 &&
			Object.keys(state.note.entities).length === 0 &&
			Object.keys(state.noteContent.entities).length === 0 &&
			Object.keys(state.project.entities).length === 0 &&
			Object.keys(state.quizEntry.entities).length === 0 &&
			Object.keys(state.quote.entities).length === 0 &&
			Object.keys(state.session.entities).length === 0 &&
			Object.keys(state.task.entities).length === 0 &&
			Object.keys(state.testSuite.entities).length === 0 &&
			Object.keys(state.word.entities).length === 0;

	}

);
