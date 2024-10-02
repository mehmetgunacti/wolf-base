import { formatDate } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyNameBase, ISODateString, NameBase, Task, TaskCategory, TaskPriority, TaskState, UUID } from '@lib';

interface TaskFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;

	learning: FormControl<NameBase | null>;
	tags: FormControl<string[]>;
	description: FormControl<string | null>;
	status: FormControl<TaskState>;
	priority: FormControl<TaskPriority>;
	category: FormControl<TaskCategory>;
	start: FormControl<ISODateString>;
	end: FormControl<ISODateString | null>;

}

export class TaskForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly learning: FormControl<NameBase | null>;
	readonly tags: FormControl<string[]>;
	readonly description: FormControl<string | null>;
	readonly status: FormControl<TaskState>;
	readonly priority: FormControl<TaskPriority>;
	readonly category: FormControl<TaskCategory>;
	readonly start: FormControl<ISODateString>;
	readonly end: FormControl<ISODateString | null>;

	constructor() {

		this.id = new FormControl(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.learning = new FormControl<NameBase>(emptyNameBase(), { validators: [Validators.required], nonNullable: true });
		this.tags = new FormControl<string[]>([], { validators: [Validators.required], nonNullable: true });
		this.description = new FormControl();
		this.status = new FormControl<TaskState>(TaskState.ongoing, { validators: [Validators.required], nonNullable: true });
		this.priority = new FormControl<TaskPriority>(TaskPriority.medium, { validators: [Validators.required], nonNullable: true });
		this.category = new FormControl<TaskCategory>(TaskCategory.bug, { validators: [Validators.required], nonNullable: true });
		this.start = new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'), { validators: [Validators.required], nonNullable: true });
		this.end = new FormControl();

	}

	formGroup(): FormGroup<TaskFormSchema> {

		return new FormGroup({

			id: this.id,
			name: this.name,
			learning: this.learning,
			tags: this.tags,
			description: this.description,
			status: this.status,
			priority: this.priority,
			category: this.category,
			start: this.start,
			end: this.end

		});

	}

	setValue(task: Task): void {

		this.id.setValue(task.id);
		this.name.setValue(task.name);
		this.learning.setValue(task.learning);
		this.tags.setValue(task.tags);
		this.description.setValue(task.description);
		this.status.setValue(task.status);
		this.priority.setValue(task.priority);
		this.category.setValue(task.category);
		this.start.setValue(formatDate(task.start, 'yyyy-MM-dd', 'en'));
		this.end.setValue(task.end);

	}

	setLearning(learning: NameBase): void {

		this.learning.setValue(learning);

	}

}

export const TASK_FORM = new InjectionToken<TaskForm>('TaskForm');
