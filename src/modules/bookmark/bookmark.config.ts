import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { BookmarkEditContainerComponent } from './containers/bookmark-edit-container/bookmark-edit-container.component';
import { BookmarksContainerComponent } from './containers/bookmarks-container/bookmarks-container.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { bookmarksReducer, BookmarksState, tagsReducer, TagsState, UIState, uiReducer } from './store';
import { ActionReducerMap } from '@ngrx/store';
import { BookmarksEffects } from './store/effects/bookmarks.effects';
import { BookmarksSearchAndTagCloudContainerComponent } from './containers/search-and-tag-cloud-container/bookmarks-search-and-tag-cloud-container.component';
import { CroppieComponent } from './components/croppie/croppie.component';

export const components = [

	// components
	BookmarkFormComponent,
	BookmarkComponent,
	CroppieComponent,

	// containers
	BookmarkEditContainerComponent,
	BookmarksContainerComponent,
	BookmarksSearchAndTagCloudContainerComponent,

	// pages
	BookmarksPageComponent

];

export interface BookmarksModuleState {

	bookmarks: BookmarksState;
	tags: TagsState;
	ui: UIState

}

export const effects = [
    BookmarksEffects,
    // TagsEffects
];

export const reducers: ActionReducerMap<BookmarksModuleState> = {

	bookmarks: bookmarksReducer,
	tags: tagsReducer,
	ui: uiReducer

};