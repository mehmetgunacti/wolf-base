import { Component } from '@angular/core';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent } from '@libComponents';
import { WordFilterContainer } from '@containers/word-filter.container';
import { WordsContainer } from '@containers/words/words.container';

@Component({
	standalone: true,
	imports: [ GlyphDirective, PortalComponent, WordsContainer, WordFilterContainer ],
	selector: 'words-page',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				routerLink="new">
				<svg wGlyph="post_add"></svg> Add
			</button>

		</w-portal>

		<app-word-filter-container/>
		<app-words-container/>

	`,
	host: { 'class': 'page' }
})
export class WordsPage extends BaseComponent { }
