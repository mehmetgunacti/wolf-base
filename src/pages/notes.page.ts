import { Component } from '@angular/core';
import { NotesSearchAndTagCloudContainer } from '@containers';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent } from '@libComponents';
import { NotesContainer } from 'containers/notes/notes.container';

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, NotesSearchAndTagCloudContainer, NotesContainer ],
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
