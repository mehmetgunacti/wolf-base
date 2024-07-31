import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISODateString, Task, TaskPriority, TaskState, UUID } from '@lib';

interface TaskFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;

	projectId: FormControl<UUID | null>;
	taskGroupId: FormControl<UUID | null>;
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
	readonly projectId: FormControl<UUID | null>;
	readonly taskGroupId: FormControl<UUID | null>;
	readonly description: FormControl<string | null>;
	readonly status: FormControl<TaskState>;
	readonly priority: FormControl<TaskPriority>;
	readonly optional: FormControl<boolean>;
	readonly start: FormControl<ISODateString>;
	readonly end: FormControl<ISODateString | null>;

	constructor() {

		this.id = new FormControl(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.projectId = new FormControl();
		this.taskGroupId = new FormControl();
		this.description = new FormControl();
		this.status = new FormControl();
		this.priority = new FormControl();
		this.optional = new FormControl();
		this.start = new FormControl();
		this.end = new FormControl();

	}

	formGroup(): FormGroup<TaskFormSchema> {

		return new FormGroup({

			id: this.id,
			name: this.name,
			projectId: this.projectId,
			taskGroupId: this.taskGroupId,
			description: this.description,
			status: this.status,
			priority: this.priority,
			optional: this.optional,
			start: this.start,
			end: this.end

		});

	}

	setValue(task: Task): void {

		this.id.setValue(task.id);
		this.name.setValue(task.name);
		this.projectId.setValue(task.projectId);
		this.taskGroupId.setValue(task.taskGroupId);
		this.description.setValue(task.description);
		this.status.setValue(task.status);
		this.priority.setValue(task.priority);
		this.optional.setValue(task.optional);
		this.start.setValue(task.start);
		this.end.setValue(task.end);

	}

}

export const TASK_FORM = new InjectionToken<TaskForm>('TaskForm');
