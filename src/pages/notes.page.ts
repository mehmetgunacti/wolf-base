import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent } from '@libComponents';
import { NotesSearchAndTagCloudContainer } from '@containers/notes-search-and-tag-cloud/notes-search-and-tag-cloud.container';
import { NotesContainer } from '@containers/notes/notes.container';

@Component({
	standalone: true,
	imports: [ PortalComponent, RouterLink, GlyphDirective, NotesSearchAndTagCloudContainer, NotesContainer ],
	selector: 'notes-page',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				routerLink="new">
				<svg wGlyph="post_add"></svg> Add
			</button>

		</w-portal>

		<app-notes-search-and-tag-cloud-container/>
		<app-notes-container/>
	`,
	host: { 'class': 'page' }
})
export class NotesPage extends BaseComponent { }
