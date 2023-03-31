import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Bookmark, UUID, SYNC_STATES } from 'lib';

export interface BookmarksState extends EntityState<Bookmark> {

	editDialogVisible: boolean;
	selected: UUID | null,
	syncRequired: number;
	syncStatus: SYNC_STATES;
	syncMessages: string[];
	syncForceOverride: boolean;

}

export const bookmarksAdapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const bookmarksInitialState: BookmarksState = bookmarksAdapter.getInitialState({

	ids: [],
	entities: {},
	editDialogVisible: false,
	selected: null,
	syncRequired: 0,
	syncStatus: SYNC_STATES.READY,
	syncMessages: [],
	syncForceOverride: false

});
