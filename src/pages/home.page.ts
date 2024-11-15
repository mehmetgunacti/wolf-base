import { Component } from '@angular/core';
import { BaseComponent, PortalComponent } from '@libComponents';
import { PinnedNotesContainer } from '@containers/pinned-notes/pinned-notes.container';
import { PopularBookmarksContainer } from '@containers/popular-bookmarks/popular-bookmarks.container';
import { QuizContainerComponent } from '@containers/quiz/quiz.container';
import { QuoteContainer } from '@containers/quotes/quotes.container';

@Component({
	selector: 'home-page',
	standalone: true,
	imports: [
		PortalComponent,
		PopularBookmarksContainer,
		QuoteContainer,
		PinnedNotesContainer,
		QuizContainerComponent
	],
	template: `
		<w-portal>
			<div class="flex items-center">
				<img src="logo.svg" style="height: 2rem;">
			</div>
		</w-portal>
		<app-quotes-container/>
		<app-popular-bookmarks-container/>
		<app-quiz-container/>
		<app-pinned-notes-container/>
	`,
	host: { 'class': 'page' }
})
export class HomePage extends BaseComponent { }
