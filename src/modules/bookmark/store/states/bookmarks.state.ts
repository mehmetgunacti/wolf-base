import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Bookmark, UUID } from 'lib';

export interface BookmarksState extends EntityState<Bookmark> {

	editDialogVisible: boolean;
	selected: UUID | null,

}

export const bookmarksAdapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const bookmarksInitialState: BookmarksState = bookmarksAdapter.getInitialState({

	editDialogVisible: false,
	selected: null

});
