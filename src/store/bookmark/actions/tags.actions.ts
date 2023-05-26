import { createAction, props } from '@ngrx/store';
import { Tag } from 'lib';

export const LoadAllTagsSuccess = createAction('[Bookmark Tags] Load All Tags Success', props<{ tags: Tag[] }>());
export const clickTag = createAction('[Bookmark Tags] Click Tag', props<{ name: string }>());
export const setSelectedTags = createAction('[Bookmark Tags] Set Selected Tags', props<{ tags: string[] }>());
export const emptySelectedTags = createAction('[Bookmark Tags] Empty Selected Tags');

export const search = createAction('[Bookmark Tags] Search', props<{ term: string }>());
