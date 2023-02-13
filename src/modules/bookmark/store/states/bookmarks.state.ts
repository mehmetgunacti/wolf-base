import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Bookmark, SYNC_STATES } from 'lib';

export interface BookmarksState extends EntityState<Bookmark> {

	syncRequired: number;
	syncStatus: SYNC_STATES;
	syncMessages: string[];
	syncForceOverride: boolean;

}

export const bookmarksAdapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const bookmarksInitialState: BookmarksState = bookmarksAdapter.getInitialState({

	ids: [],
	entities: {},
	syncRequired: 0,
	syncStatus: SYNC_STATES.READY,
	syncMessages: [],
	syncForceOverride: false,

});
