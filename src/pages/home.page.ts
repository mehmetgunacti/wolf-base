import { Component } from '@angular/core';
import * as container from '@containers';
import { BaseComponent, PortalComponent } from '@libComponents';

@Component({
	selector: 'home-page',
	standalone: true,
	imports: [
		PortalComponent,
		container.PopularBookmarksContainer,
		container.QuoteContainer,
		container.PinnedNotesContainer
	],
	template: `
		<w-portal>
			<div class="flex items-center">
				<img src="logo.svg" style="height: 2rem;">
			</div>
		</w-portal>
		<app-quotes-container/>
		<app-pinned-notes-container/>
		<app-popular-bookmarks-container/>
	`,
	host: { 'class': 'page' }
})
export class HomePage extends BaseComponent { }
