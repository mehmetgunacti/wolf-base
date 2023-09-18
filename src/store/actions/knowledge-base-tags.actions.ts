import { createAction, props } from '@ngrx/store';

export const clickTag = createAction('[Knowledge Base Tags] Click Tag', props<{ name: string }>());
export const setSelectedTags = createAction('[Knowledge Base Tags] Set Selected Tags', props<{ tags: string[] }>());
export const emptySelectedTags = createAction('[Knowledge Base Tags] Empty Selected Tags');
export const search = createAction('[Knowledge Base Tags] Search', props<{ term: string }>());
