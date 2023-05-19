import { createAction, props } from '@ngrx/store';
import { Tag } from 'lib';

export const LoadAllTagsSuccess = createAction('[Tags] Load All Tags Success', props<{ tags: Tag[] }>());
export const clickTag = createAction('[Tags] Click Tag', props<{ name: string }>());
export const setSelectedTags = createAction('[Tags] Set Selected Tags', props<{ tags: string[] }>());

export const search = createAction('[Tags] Search', props<{ term: string }>());
