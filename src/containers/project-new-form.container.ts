import { entityActions } from '@actions/entity.actions';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { ProjectForm } from '@forms/project/project.form';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Project } from '@models/project.model';
import { Store } from '@ngrx/store';

@Component({
	imports: [ PortalComponent, RouterLink, ProjectForm, GlyphDirective ],
	selector: 'app-project-new-form-container',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				[routerLink]="['/projects']">
				<svg wGlyph="cancel"></svg> Cancel
			</button>

		</w-portal>

		<header class="mb-8 comp-title">Add Project</header>
		<app-project-form (create)="onCreate($event)"/>
	`,
	host: { 'class': 'comp p-2 md:p-4' }
})
export class ProjectNewFormContainer extends BaseComponent {

	private store = inject(Store);

	onCreate(project: Partial<Project>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.project, entity: project }));

	}

}
