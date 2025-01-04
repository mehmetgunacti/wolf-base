import { Component } from '@angular/core';
import { BookmarksSearchAndTagCloudContainer } from '@containers/bookmarks-search-and-tag-cloud/bookmarks-search-and-tag-cloud.container';
import { BookmarksContainer } from '@containers/bookmarks/bookmarks.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ BookmarksSearchAndTagCloudContainer, BookmarksContainer ],
	selector: 'bookmarks-page',
	template: `
		<app-bookmarks-search-and-tag-cloud-container/>
		<app-bookmarks-container/>
	`,
	host: { 'class': 'page' }
})
export class BookmarksPage extends BaseComponent { }
