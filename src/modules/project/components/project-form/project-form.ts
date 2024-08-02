import { formatDate } from '@angular/common';
import { InjectionToken, WritableSignal, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISODateString, NameBase, ObjectId, Project, ProjectStatus, UUID } from '@lib';

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

class TaskGroupForm {

	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;

	private taskId: ObjectId = new ObjectId('task_');

	constructor(
		// to be used by @for (... track objectId)
		public readonly objectId: string,
		taskGroup?: NameBase
	) {

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });

		if (taskGroup)
			this.setValue(taskGroup);

	}

	formGroup(): FormGroup<TaskGroupFormSchema> {

		return new FormGroup({

			id: this.id,
			name: this.name

		});

	}

	setValue(taskGroup: NameBase): void {

		this.id.setValue(taskGroup.id);
		this.name.setValue(taskGroup.name);

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
