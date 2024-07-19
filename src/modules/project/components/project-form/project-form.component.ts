import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { UUID, Project, isInvalid } from 'lib';
import { DEFINITION_LANGUAGES, DEFINITION_TYPES } from 'lib/constants/project.constant';
import { filter, tap } from 'rxjs';
import { PROJECT_FORM, ProjectForm } from './project-form';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss'],
	providers: [{ provide: PROJECT_FORM, useClass: ProjectForm }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent {

	DEFINITION_LANGUAGES = DEFINITION_LANGUAGES;
	DEFINITION_TYPES = DEFINITION_TYPES;

	/* @Input() */
	project = input<Project | null>(null);

	@Output() create: EventEmitter<Partial<Project>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, project: Partial<Project> }> = new EventEmitter();

	form: ProjectForm = inject(PROJECT_FORM);

	constructor() {

		// on incoming 'project' set form values
		toObservable(this.project).pipe(

			takeUntilDestroyed(),
			filter((project): project is Project => project !== null),
			tap(project => this.form.setValue(project))

		).subscribe();

	}

	onSave(): void {

		const formGroup = this.form.formGroup();
		if (isInvalid(formGroup))
			return;

		const project: Partial<Project> = formGroup.value as Partial<Project>;
		if (project.id)
			this.update.emit({ id: project.id, project });
		else
			this.create.emit(project);

	}

}
