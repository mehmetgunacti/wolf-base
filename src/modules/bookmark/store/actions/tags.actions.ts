import { createAction, props } from '@ngrx/store';
import { Tag } from 'lib';

export const tagsSetPopularTag = createAction('[Tags] set popular tag');

// export const tagsLoadAll = createAction('[Tags] load all');
export const tagsLoadAllSuccess = createAction('[Tags] load all success', props<{ tags: Tag[] }>());
export const tagsClicked = createAction('[Tags] Tag Clicked', props<{ name: string }>());

// export const tagsSearch = createAction('[Tags] search', props<{ 'term': string }>());

// export const tagsClicked = createAction('[Tags] clicked', props<ITag>());
