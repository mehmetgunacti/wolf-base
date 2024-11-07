import { Component } from '@angular/core';
import { ProjectFilterContainer, ProjectsContainer } from '@containers';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, ProjectsContainer, ProjectFilterContainer ],
	selector: 'projects-page',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				routerLink="new">
				<svg wGlyph="post_add"></svg> Add
			</button>

		</w-portal>

		<app-project-filter-container/>
		<app-projects-container/>
	`,
	host: { 'class': 'page' }
})
export class ProjectsPage extends BaseComponent { }
