import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Entity_ModuleState } from 'store/states/entity.state';

export const selEntity_ModuleState = createFeatureSelector<Entity_ModuleState>('entities');

// BOOKMARK
export const selBookmark_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.bookmark

);

// NOTE
export const selNote_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.note

);

// NOTE CONTENT
export const selNoteContent_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.noteContent

);

// PROJECT
export const selProject_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.project

);

// TASK
export const selTask_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.task

);

// QUIZ ENTRY
export const selQuizEntry_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.quizEntry

);

// QUOTE
export const selQuote_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.quote

);

// WORD
export const selWord_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.word

);
