import { ChangeDetectionStrategy, Component, Signal, effect, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TASK_PRIORITIES, TASK_STATE, Task, UUID, isInvalid } from 'lib';
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

	/* @Output() */
	create = output<Partial<Task>>();
	update = output<{ id: UUID, project: Partial<Task> }>();

	form: TaskForm = inject(TASK_FORM);
	optional: Signal<boolean | undefined>;

	constructor() {

		this.optional = toSignal(this.form.optional.valueChanges);

		effect(() => {

			const task = this.task();
			if (task)
				this.form.setValue(task);

		});

	}

	onSave(): void {

		const formGroup = this.form.formGroup();
		if (isInvalid(formGroup))
			return;

		const task: Partial<Task> = formGroup.value as Partial<Task>;
		if (task.id)
			this.update.emit({ id: task.id, project: task });
		else
			this.create.emit(task);

	}

}
