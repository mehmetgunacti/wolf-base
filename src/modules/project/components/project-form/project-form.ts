import { InjectionToken, WritableSignal, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISODateString, ObjectId, Project, ProjectStatus, Task, TaskGroup, TaskPriority, TaskState, UUID } from '@lib';
import { formatDate } from '@angular/common';

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

interface TaskGroupFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	// tasks: FormArray<FormGroup<TaskFormSchema>>;

}

interface ProjectFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;
	status: FormControl<ProjectStatus>;
	start: FormControl<string>;
	end: FormControl<ISODateString | null>;
	taskGroups: FormArray<FormGroup<TaskGroupFormSchema>>;

}

class TaskForm {

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

	constructor(
		// to be used by @for (... track objectId)
		public readonly objectId: string,
		task?: Task
	) {

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

		if (task)
			this.setValue(task);

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

class TaskGroupForm {

	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly tasks: WritableSignal<TaskForm[]>;

	private taskId: ObjectId = new ObjectId('task_');

	constructor(
		// to be used by @for (... track objectId)
		public readonly objectId: string,
		taskGroup?: TaskGroup
	) {

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });

		// tasks
		this.tasks = signal([new TaskForm(this.taskId.next())]);

		if (taskGroup)
			this.setValue(taskGroup);

	}

	addTask(): void {

		this.tasks.update(list => {
			list.push(new TaskForm(this.taskId.next()));
			return list;
		});

	}

	removeTask(id: UUID): void {

		this.tasks.update(
			list => list.filter(item => item.id.value === id)
		);

	}

	formGroup(): FormGroup<TaskGroupFormSchema> {

		return new FormGroup({

			id: this.id,
			name: this.name,
			// tasks: new FormArray(this.tasks().map(t => t.formGroup()))

		});

	}

	setValue(taskGroup: TaskGroup): void {

		this.id.setValue(taskGroup.id);
		this.name.setValue(taskGroup.name);

		// this.tasks.set(
		// 	taskGroup.tasks.map(t => new TaskForm(this.taskId.next(), t))
		// );

	}

}

export class ProjectForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly description: FormControl<string | null>;
	readonly status: FormControl<ProjectStatus>;
	readonly start: FormControl<string>;
	readonly end: FormControl<string | null>;

	// task groups
	readonly taskGroups: WritableSignal<TaskGroupForm[]>;

	private taskGroupId: ObjectId = new ObjectId('taskGroup_');

	constructor() {

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.description = new FormControl<string | null>(null);
		this.status = new FormControl<ProjectStatus>(ProjectStatus.ongoing, { validators: [Validators.required], nonNullable: true });
		this.start = new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'), { validators: [Validators.required], nonNullable: true });
		this.end = new FormControl<string | null>(null);

		// task groups
		this.taskGroups = signal<TaskGroupForm[]>([new TaskGroupForm(this.taskGroupId.next())]);

	}

	addTaskGroup(): void {

		this.taskGroups.update(list => {
			list.push(new TaskGroupForm(this.taskGroupId.next()));
			return list;
		});

	}

	removeTaskGroup(objectId: string): void {

		this.taskGroups.update(
			list => {
				list.splice(list.findIndex(d => d.objectId === objectId), 1);
				return list;
			}
		);

	}

	formGroup(): FormGroup<ProjectFormSchema> {

		return new FormGroup<ProjectFormSchema>({

			id: this.id,
			name: this.name,
			description: this.description,
			status: this.status,
			start: this.start,
			end: this.end,
			taskGroups: new FormArray(this.taskGroups().map(tg => tg.formGroup()))

		});

	}

	setValue(project: Project): void {

		this.id.setValue(project.id);
		this.name.setValue(project.name);
		this.description.setValue(project.description);
		this.status.setValue(project.status);
		this.start.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
		this.end.setValue(project.end);

		this.taskGroups.set(project.taskGroups.map(tg => new TaskGroupForm(this.taskGroupId.next(), tg)));

	}

}

export const PROJECT_FORM = new InjectionToken<ProjectForm>('ProjectForm');
