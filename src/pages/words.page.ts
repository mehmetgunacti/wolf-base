import { Component } from '@angular/core';
import { WordFilterContainer, WordsContainer } from '@containers';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent } from '@libComponents';

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
