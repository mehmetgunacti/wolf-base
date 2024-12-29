import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordFilterContainer } from '@containers/word-filter.container';
import { WordsContainer } from '@containers/words/words.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';

@Component({
	imports: [ GlyphDirective, PortalComponent, WordsContainer, WordFilterContainer, RouterLink ],
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
