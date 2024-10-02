import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NameBase, TAG_OPTIONAL, TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATE, Task, TaskState, UUID, elseEmptyArray, isInvalid } from 'lib';
import { TASK_FORM, TaskForm } from './task-form';

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.scss'],
	providers: [{ provide: TASK_FORM, useClass: TaskForm }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

	TAG_OPTIONAL = TAG_OPTIONAL;
	TASK_STATE = TASK_STATE;
	TASK_PRIORITIES = TASK_PRIORITIES;
	TASK_CATEGORIES = TASK_CATEGORIES;

	/* @Input() */
	task = input<Task | null>(null);
	learning = input<NameBase | null>(null);
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

			else { // is new ? set learning id and name

				const learning = this.learning();
				if (learning) {

					const { id, name } = learning;
					this.form.setLearning({ id, name });

				}

			}

		}, { allowSignalWrites: true }); // CVA writeValue calls signal.set(...)

		// set end date depending on status
		this.form.status.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(
				val => {

					if (val === TaskState.completed || val === TaskState.abandoned)
						this.form.end.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
					else
						this.form.end.setValue(null);

				}
			);

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

	onToggleOptional(): void {

		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(TAG_OPTIONAL) ? tags.filter(v => v !== TAG_OPTIONAL) : [TAG_OPTIONAL, ...tags]
		);
		this.form.tags.markAsDirty();
		this.form.tags.updateValueAndValidity();

	}

}
