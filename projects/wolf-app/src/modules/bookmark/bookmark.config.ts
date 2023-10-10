import { SelectedTagsComponent } from 'lib/components/selected-tags/selected-tags.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { CroppieComponent } from './components/croppie/croppie.component';
import { BookmarkEditContainerComponent } from './containers/bookmark-edit-container/bookmark-edit-container.component';
import { BookmarksContainerComponent } from './containers/bookmarks-container/bookmarks-container.component';
import { BookmarksSearchAndTagCloudContainerComponent } from './containers/search-and-tag-cloud-container/bookmarks-search-and-tag-cloud-container.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';

export const components = [

	// components
	BookmarkFormComponent,
	CroppieComponent,
	SelectedTagsComponent,

	// containers
	BookmarkEditContainerComponent,
	BookmarksContainerComponent,
	BookmarksSearchAndTagCloudContainerComponent,

	// pages
	BookmarksPageComponent

];
