import { formatDate } from '@angular/common';
import { InjectionToken, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyNameBase, ISODateString, NameBase, Task, TaskPriority, TaskState, UUID } from '@lib';

interface TaskFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;

	project: FormControl<NameBase | null>;
	taskGroup: FormControl<NameBase | null>;
	description: FormControl<string | null>;
	status: FormControl<TaskState>;
	priority: FormControl<TaskPriority>;
	optional: FormControl<boolean>;
	start: FormControl<ISODateString>;
	end: FormControl<ISODateString | null>;

}

export class TaskForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly project: FormControl<NameBase | null>;
	readonly taskGroup: FormControl<NameBase | null>;
	readonly description: FormControl<string | null>;
	readonly status: FormControl<TaskState>;
	readonly priority: FormControl<TaskPriority>;
	readonly optional: FormControl<boolean>;
	readonly start: FormControl<ISODateString>;
	readonly end: FormControl<ISODateString | null>;

	constructor() {

		this.id = new FormControl(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.project = new FormControl<NameBase>(emptyNameBase(), { validators: [Validators.required], nonNullable: true });
		this.taskGroup = new FormControl<NameBase>(emptyNameBase(), { validators: [Validators.required], nonNullable: true });
		this.description = new FormControl();
		this.status = new FormControl<TaskState>(TaskState.ongoing, { validators: [Validators.required], nonNullable: true });
		this.priority = new FormControl<TaskPriority>(TaskPriority.normal, { validators: [Validators.required], nonNullable: true });
		this.optional = new FormControl<boolean>(false, { validators: [Validators.required], nonNullable: true });
		this.start = new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'), { validators: [Validators.required], nonNullable: true });
		this.end = new FormControl();

	}

	formGroup(): FormGroup<TaskFormSchema> {

		return new FormGroup({

			id: this.id,
			name: this.name,
			project: this.project,
			taskGroup: this.taskGroup,
			description: this.description,
			status: this.status,
			priority: this.priority,
			optional: this.optional,
			start: this.start,
			end: this.end

		});

	}

	setValue(task: Task): void {

		console.log('incoming task setting values', task);

		this.id.setValue(task.id);
		this.name.setValue(task.name);
		this.project.setValue(task.project);
		this.taskGroup.setValue(task.taskGroup);
		this.description.setValue(task.description);
		this.status.setValue(task.status);
		this.priority.setValue(task.priority);
		this.optional.setValue(task.optional);
		this.start.setValue(formatDate(task.start, 'yyyy-MM-dd', 'en'));
		this.end.setValue(task.end);

	}

}

export const TASK_FORM = new InjectionToken<TaskForm>('TaskForm');
