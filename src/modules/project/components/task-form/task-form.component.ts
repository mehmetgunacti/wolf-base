import { ChangeDetectionStrategy, Component, Signal, effect, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NameBase, TASK_PRIORITIES, TASK_STATE, Task, UUID, isInvalid } from 'lib';
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

	/* @Input() */
	task = input<Task | null>(null);
	project = input<NameBase | null>(null);
	taskGroup = input<NameBase | null>(null);

	/* @Output() */
	create = output<Partial<Task>>();
	update = output<{ id: UUID, task: Partial<Task> }>();
	cancel = output<UUID>();
	close = output<void>();

	form: TaskForm = inject(TASK_FORM);
	optional: Signal<boolean | undefined>;

	constructor() {

		this.optional = toSignal(this.form.optional.valueChanges);

		effect(() => {

			const task = this.task();
			if (task)
				this.form.setValue(task);
			else {

				this.form.project.setValue(this.project());
				this.form.taskGroup.setValue(this.taskGroup());

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

}
