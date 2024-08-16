import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { NameBase, TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATE, Task, UUID, elseEmptyArray, isInvalid } from 'lib';
import { TASK_FORM, TaskForm } from './task-form';

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.scss'],
	providers: [{ provide: TASK_FORM, useClass: TaskForm }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

	TASK_STATE = TASK_STATE;
	TASK_PRIORITIES = TASK_PRIORITIES;
	TASK_CATEGORIES = TASK_CATEGORIES;

	/* @Input() */
	task = input<Task | null>(null);
	project = input<NameBase | null>(null);
	tagSuggestions = input<string[], string[] | null>([], { transform: elseEmptyArray<string> });

	/* @Output() */
	create = output<Partial<Task>>();
	update = output<{ id: UUID, task: Partial<Task> }>();
	cancel = output<UUID>();
	close = output<void>();
	tagInput = output<string | null>();

	form: TaskForm = inject(TASK_FORM);
	isEdit = computed(() => this.task() !== null);

	constructor() {

		effect(() => {

			const task = this.task();
			if (task) // is edit? set values
				this.form.setValue(task);

			else { // is new ? set project id and name

				const project = this.project();
				if (project) {

					const { id, name } = project;
					this.form.setProject({ id, name });

				}

			}

		});

	}

	onSave(): void {

		const formGroup = this.form.formGroup();
		if (isInvalid(formGroup))
			return;

		const task: Partial<Task> = formGroup.value as Partial<Task>;
		if (task.id)
			this.update.emit({ id: task.id, task });
		else
			this.create.emit(task);

	}

	onCancel(id: UUID): void {

		this.cancel.emit(id);

	}

	onClose(): void {

		this.close.emit();

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

}
