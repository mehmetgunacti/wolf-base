import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Tag } from 'lib';

export interface TagsState extends EntityState<Tag> {

	tagCloudVisible: boolean;
	selected: { [key: string]: boolean };

}

export const tagsAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const tagsInitialState: TagsState = tagsAdapter.getInitialState({

	ids: [],
	entities: {},
	tagCloudVisible: false,
	selected: {}

});
