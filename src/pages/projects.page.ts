import { Component } from '@angular/core';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent } from '@libComponents';
import { ProjectFilterContainer } from '@containers/project-filter.container';
import { ProjectsContainer } from '@containers/projects/projects.container';

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
