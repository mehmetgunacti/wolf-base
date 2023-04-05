import { createAction, props } from '@ngrx/store';
import { Tag } from 'lib';

export const LoadAllTagsSuccess = createAction('[Tags] Load All Tags Success', props<{ tags: Tag[] }>());
export const clickTag = createAction('[Tags] Click Tag', props<{ name: string }>());
