import { formatDate } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { ProjectStatus } from '@constants/project.constant';
import { ISODateString } from '@models/id-base.model';
import { Project } from '@models/project.model';
import { fc, fg, nnfc } from '@utils/form.util';

interface ProjectFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;
	status: FormControl<ProjectStatus>;
	start: FormControl<string>;
	end: FormControl<ISODateString | null>;

}

function createFormGroup(value?: Project): FormGroup<ProjectFormSchema> {

	const {

		id = null,
		name = '',
		description = null,
		status = ProjectStatus.ongoing,
		start = formatDate(new Date(), 'yyyy-MM-dd', 'en'),
		end = null

	} = value ?? {};

	return fg<ProjectFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		description: fc(description),
		status: nnfc(status),
		start: nnfc(start),
		end: fc(end)

	});

}

export class ProjectFormImpl {

	readonly fg: FormGroup<ProjectFormSchema> = createFormGroup();

	populate(entity: Project): void {

		const fg = this.fg;
		const { id, name, description, status, start, end } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, description, status, start, end });

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get description(): FormControl<string | null> { return this.fg.controls.description; }
	get status(): FormControl<ProjectStatus> { return this.fg.controls.status; }
	get start(): FormControl<ISODateString> { return this.fg.controls.start; }
	get end(): FormControl<ISODateString | null> { return this.fg.controls.end; }

}

export const PROJECT_FORM = new InjectionToken<ProjectFormImpl>('PROJECT_FORM');
