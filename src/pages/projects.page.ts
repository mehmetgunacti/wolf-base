import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectFilterContainer } from '@containers/project-filter.container';
import { ProjectsContainer } from '@containers/projects/projects.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, ProjectsContainer, ProjectFilterContainer, RouterLink ],
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
