import { formatDate } from '@angular/common';
import { Component, effect, inject, input, output, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { PROJECT_STATUS, ProjectStatus } from '@constants/project.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { RequiredValidatorDirective } from '@directives/required-validator.directive';
import { BaseComponent } from '@libComponents/base.component';
import { InputComponent } from '@libComponents/input/input.component';
import { SelectComponent } from '@libComponents/select/select.component';
import { Project } from '@models/project.model';
import { PROJECT_FORM, ProjectFormImpl } from './project-form';

@Component({
	imports: [ RequiredValidatorDirective, InputComponent, SelectComponent, ReactiveFormsModule, GlyphDirective ],
	selector: 'app-project-form',
	templateUrl: './project.form.html',
	providers: [ { provide: PROJECT_FORM, useClass: ProjectFormImpl } ]
})
export class ProjectForm extends BaseComponent {

	PROJECT_STATUS = PROJECT_STATUS;
	ProjectStatus = ProjectStatus;

	// Input
	project = input<Project | null>(null);

	// Output
	create = output<Partial<Project>>();
	update = output<{ id: UUID, project: Partial<Project>; }>();

	form = inject(PROJECT_FORM);

	constructor() {

		super();
		effect(() => {

			const project = this.project();
			if (project)
				untracked(() => this.form.populate(project));

		});

		// set end date on status change
		this.form.status.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(
				status => {

					const currentStatus = status === ProjectStatus.completed || status === ProjectStatus.abandoned;
					const endDate = this.form.end.value;
					if (currentStatus)
						if (endDate === null)
							this.form.end.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));

				}
			);

	}

	onSave(): void {

		if (this.form.fg.invalid)
			return;

		const project: Partial<Project> = { ...this.form.fg.value, modified: new Date().toISOString() } as Partial<Project>;
		if (project.id)
			this.update.emit({ id: project.id, project });
		else
			this.create.emit(project);

	}

}
