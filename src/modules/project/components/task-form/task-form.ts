import { formatDate } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyNameBase, ISODateString, NameBase, Task, TaskPriority, TaskState, UUID } from '@lib';

interface TaskFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;

	project: FormControl<NameBase | null>;
	tags: FormControl<string[]>;
	description: FormControl<string | null>;
	status: FormControl<TaskState>;
	priority: FormControl<TaskPriority>;
	start: FormControl<ISODateString>;
	end: FormControl<ISODateString | null>;

}

export class TaskForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly project: FormControl<NameBase | null>;
	readonly tags: FormControl<string[]>;
	readonly description: FormControl<string | null>;
	readonly status: FormControl<TaskState>;
	readonly priority: FormControl<TaskPriority>;
	readonly start: FormControl<ISODateString>;
	readonly end: FormControl<ISODateString | null>;

	constructor() {

		this.id = new FormControl(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.project = new FormControl<NameBase>(emptyNameBase(), { validators: [Validators.required], nonNullable: true });
		this.tags = new FormControl<string[]>([], { validators: [Validators.required], nonNullable: true });
		this.description = new FormControl();
		this.status = new FormControl<TaskState>(TaskState.ongoing, { validators: [Validators.required], nonNullable: true });
		this.priority = new FormControl<TaskPriority>(TaskPriority.normal, { validators: [Validators.required], nonNullable: true });
		this.start = new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'), { validators: [Validators.required], nonNullable: true });
		this.end = new FormControl();

	}

	formGroup(): FormGroup<TaskFormSchema> {

		return new FormGroup({

			id: this.id,
			name: this.name,
			project: this.project,
			tags: this.tags,
			description: this.description,
			status: this.status,
			priority: this.priority,
			start: this.start,
			end: this.end

		});

	}

	setValue(task: Task): void {

		this.id.setValue(task.id);
		this.name.setValue(task.name);
		this.project.setValue(task.project);
		this.tags.setValue(task.tags);
		this.description.setValue(task.description);
		this.status.setValue(task.status);
		this.priority.setValue(task.priority);
		this.start.setValue(formatDate(task.start, 'yyyy-MM-dd', 'en'));
		this.end.setValue(task.end);

	}

}

export const TASK_FORM = new InjectionToken<TaskForm>('TaskForm');
