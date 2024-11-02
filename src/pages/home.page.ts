import { Component } from '@angular/core';
import * as container from '@containers';
import { BaseComponent, PortalComponent } from '@libComponents';
import { QuizContainerComponent } from "../containers/quiz/quiz.container";

@Component({
	selector: 'home-page',
	standalone: true,
	imports: [
    PortalComponent,
    container.PopularBookmarksContainer,
    container.QuoteContainer,
    container.PinnedNotesContainer,
    QuizContainerComponent
],
	template: `
		<w-portal>
			<div class="flex items-center">
				<img src="logo.svg" style="height: 2rem;">
			</div>
		</w-portal>
		<app-quiz-container/>
		<app-quotes-container/>
		<app-popular-bookmarks-container/>
		<app-pinned-notes-container/>
	`,
	host: { 'class': 'page' }
})
export class HomePage extends BaseComponent { }
