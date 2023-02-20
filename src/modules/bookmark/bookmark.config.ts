import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { BookmarkEditContainerComponent } from './containers/bookmark-edit-container/bookmark-edit-container.component';
import { BookmarksContainerComponent } from './containers/bookmarks-container/bookmarks-container.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { bookmarksReducer, BookmarksState, tagsReducer, TagsState } from './store';
import { ActionReducerMap } from '@ngrx/store';

export const components = [

	// components
	BookmarkFormComponent,
	BookmarkComponent,

	// containers
	BookmarkEditContainerComponent,
	BookmarksContainerComponent,

	// pages
	BookmarksPageComponent

];

export interface BookmarksModuleState {

	bookmarks: BookmarksState;
	tags: TagsState;

}

export const reducers: ActionReducerMap<BookmarksModuleState> = {

	bookmarks: bookmarksReducer,
	tags: tagsReducer

};