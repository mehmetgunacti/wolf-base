import { formatDate } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISODateString, Project, ProjectStatus, UUID } from '@lib';

interface ProjectFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;
	status: FormControl<ProjectStatus>;
	start: FormControl<string>;
	end: FormControl<ISODateString | null>;

}

export class ProjectForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly description: FormControl<string | null>;
	readonly status: FormControl<ProjectStatus>;
	readonly start: FormControl<string>;
	readonly end: FormControl<string | null>;

	constructor() {

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.description = new FormControl<string | null>(null);
		this.status = new FormControl<ProjectStatus>(ProjectStatus.ongoing, { validators: [Validators.required], nonNullable: true });
		this.start = new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'), { validators: [Validators.required], nonNullable: true });
		this.end = new FormControl<string | null>(null);

	}

	formGroup(): FormGroup<ProjectFormSchema> {

		return new FormGroup<ProjectFormSchema>({

			id: this.id,
			name: this.name,
			description: this.description,
			status: this.status,
			start: this.start,
			end: this.end

		});

	}

	setValue(project: Project): void {

		this.id.setValue(project.id);
		this.name.setValue(project.name);
		this.description.setValue(project.description);
		this.status.setValue(project.status);
		this.start.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
		this.end.setValue(project.end);

	}

}

export const PROJECT_FORM = new InjectionToken<ProjectForm>('ProjectForm');
