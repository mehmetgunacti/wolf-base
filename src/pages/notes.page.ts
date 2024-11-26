import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotesSearchAndTagCloudContainer } from '@containers/notes-search-and-tag-cloud/notes-search-and-tag-cloud.container';
import { NotesContainer } from '@containers/notes/notes.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';

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

			<button class="btn btn-ghost" (click)="addUrls()">add urls</button>

		</w-portal>

		<app-notes-search-and-tag-cloud-container/>
		<app-notes-container/>
	`,
	host: { 'class': 'page' }
})
export class NotesPage extends BaseComponent {

	private repo = inject(LOCAL_REPOSITORY_SERVICE);

	async addUrls(): Promise<void> {

		const ids = await this.repo.notes.listIds();

		for (const id of ids) {

			const note = await this.repo.notes.getEntity(id);
			await this.repo.notes.update(id, { ...note, urls: [] });


		}
		console.log(ids.length);

	}

}
