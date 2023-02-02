import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { BookmarkEditContainerComponent } from './containers/bookmark-edit-container/bookmark-edit-container.component';
import { BookmarksContainerComponent } from './containers/bookmarks-container/bookmarks-container.component';
import { BookmarkNewContainerComponent } from './containers/bookmark-new-container/bookmark-new-container.component';
import { BookmarkEditPageComponent } from './pages/bookmark-edit-page/bookmark-edit-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { BookmarkNewPageComponent } from './pages/bookmark-new-page/bookmark-new-page.component';

export const components = [

	// components
	BookmarkFormComponent,
	BookmarkComponent,

	// containers
	BookmarkEditContainerComponent,
	BookmarkNewContainerComponent,
	BookmarksContainerComponent,

	// pages
	BookmarkEditPageComponent,
	BookmarkNewPageComponent,
	BookmarksPageComponent

];
