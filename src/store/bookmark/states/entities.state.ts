import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Bookmark, UUID } from 'lib';

// todo move some properties to ui state
export interface EntitiesState extends EntityState<Bookmark> {

	editDialogVisible: boolean;
	selected: UUID | null;
	tagCloudVisible: boolean;

}

export const entitiesAdapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const entitiesInitialState: EntitiesState = entitiesAdapter.getInitialState({

	editDialogVisible: false,
	selected: null,
	tagCloudVisible: false

});
