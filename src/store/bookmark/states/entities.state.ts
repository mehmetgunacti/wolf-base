import { Bookmark, Click, UUID } from 'lib';

// todo move some properties to ui state
export interface EntitiesState {

	entities: Map<UUID, Bookmark>;
	selected: UUID | null;
	clicks: Click[];

}

export const entitiesInitialState: EntitiesState = {

	entities: new Map(),
	selected: null,
	clicks: []

};
