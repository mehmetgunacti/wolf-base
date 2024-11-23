import { formatDate } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { TaskCategory, TaskPriority, TaskState } from '@constants/project.constant';
import { ISODateString, NameBase } from '@models/id-base.model';
import { Task } from '@models/project.model';
import { fc, fg, nnfc } from '@utils/form.util';

interface TaskFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;

	project: FormControl<NameBase | null>;
	tags: FormControl<string[]>;
	description: FormControl<string | null>;
	status: FormControl<TaskState>;
	priority: FormControl<TaskPriority>;
	category: FormControl<TaskCategory>;
	start: FormControl<ISODateString>;
	end: FormControl<ISODateString | null>;

}

function createFormGroup(value?: Task): FormGroup<TaskFormSchema> {

	const {

		id = null,
		name = '',
		project = null,
		tags = [],
		description = null,
		status = TaskState.ongoing,
		priority = TaskPriority.medium,
		category = TaskCategory.bug,
		start = formatDate(new Date(), 'yyyy-MM-dd', 'en'),
		end = null

	} = value ?? {};

	return fg<TaskFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		project: nnfc(project, Validators.required),
		tags: nnfc(tags, Validators.required),
		description: nnfc<string | null>(description),
		status: nnfc<TaskState>(status, Validators.required),
		priority: nnfc<TaskPriority>(priority, Validators.required),
		category: nnfc<TaskCategory>(category, Validators.required),
		start: nnfc<ISODateString>(start, Validators.required),
		end: fc<ISODateString | null>(end)

	});

}

export class TaskFormImpl {

	fg: FormGroup<TaskFormSchema> = createFormGroup();

	populate(entity: Task): void {

		const fg = this.fg;
		const { id, name, project, tags, description, status, priority, category, start, end } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, project, tags, description, status, priority, category, start, end });

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get project(): FormControl<NameBase | null> { return this.fg.controls.project; }
	get tags(): FormControl<string[]> { return this.fg.controls.tags; }
	get description(): FormControl<string | null> { return this.fg.controls.description; };
	get status(): FormControl<TaskState> { return this.fg.controls.status; };
	get priority(): FormControl<TaskPriority> { return this.fg.controls.priority; };
	get category(): FormControl<TaskCategory> { return this.fg.controls.category; };
	get start(): FormControl<ISODateString> { return this.fg.controls.start; };
	get end(): FormControl<ISODateString | null> { return this.fg.controls.end; };

}

export const TASK_FORM = new InjectionToken<TaskFormImpl>('TASK_FORM');
