import { entityActions } from '@actions/entity.actions';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { ProjectForm } from '@forms/project/project.form';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Project } from '@models/project.model';
import { Store } from '@ngrx/store';
import { selProject_selected } from '@selectors/project/project-ui.selectors';

@Component({
	imports: [ PortalComponent, RouterLink, ProjectForm, GlyphDirective ],
	selector: 'app-project-edit-form-container',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				[routerLink]="['/projects', project()?.id ]">
				<svg wGlyph="cancel"></svg> Cancel
			</button>

		</w-portal>

		<header class="mb-8 comp-title">Edit Project</header>
		<app-project-form [project]="project()" (update)="onUpdate($event.id, $event.project)"/>
	`,
	host: { 'class': 'comp p-4' }
})
export class ProjectEditFormContainer extends BaseComponent {

	private store = inject(Store);

	project = this.store.selectSignal(selProject_selected);

	onUpdate(id: UUID, project: Partial<Project>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.project, id, entity: project }));

	}

}
