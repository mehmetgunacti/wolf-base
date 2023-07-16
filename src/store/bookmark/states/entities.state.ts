import { Bookmark, UUID } from 'lib';

// todo move some properties to ui state
export interface EntitiesState {

	entities: Map<UUID, Bookmark>;
	editDialogVisible: boolean;
	selected: UUID | null;
	tagCloudVisible: boolean;

}

export const entitiesInitialState: EntitiesState = {

	entities: new Map(),
	editDialogVisible: false,
	selected: null,
	tagCloudVisible: false

};
