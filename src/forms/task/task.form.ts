import { AsyncPipe, formatDate } from '@angular/common';
import { Component, effect, inject, input, output, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { TAG_OPTIONAL, TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATE, TaskState } from '@constants/project.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { RequiredValidatorDirective } from '@directives/required-validator.directive';
import { BaseComponent } from '@libComponents/base.component';
import { InputTagComponent } from '@libComponents/input-tag/input-tag.component';
import { InputComponent } from '@libComponents/input/input.component';
import { PortalComponent } from '@libComponents/portal.component';
import { SelectComponent } from '@libComponents/select/select.component';
import { TextareaComponent } from '@libComponents/textarea/textarea.component';
import { NameBase } from '@models/id-base.model';
import { Task } from '@models/project.model';
import { TASK_FORM, TaskFormImpl } from './task-form';

@Component({
	imports: [ InputComponent, RequiredValidatorDirective, InputTagComponent, ReactiveFormsModule, GlyphDirective, AsyncPipe, PortalComponent, SelectComponent, TextareaComponent ],
	selector: 'app-task-form',
	templateUrl: './task.form.html',
	providers: [ { provide: TASK_FORM, useClass: TaskFormImpl } ],
	host: { 'class': 'flex flex-col gap-4' }
})
export class TaskForm extends BaseComponent {

	TAG_OPTIONAL = TAG_OPTIONAL;
	TASK_STATE = TASK_STATE;
	TASK_PRIORITIES = TASK_PRIORITIES;
	TASK_CATEGORIES = TASK_CATEGORIES;

	// INPUT
	task = input<Task | null>(null);
	project = input.required<NameBase>();
	tagSuggestions = input<string[]>([]);

	// OUTPUT
	create = output<Partial<Task>>();
	update = output<{ id: UUID, task: Partial<Task>; }>();
	tagInput = output<string | null>();

	protected form = inject(TASK_FORM);

	constructor() {

		super();
		effect(() => {

			const task = this.task();
			if (task) // is edit? set values
				untracked(() => this.form.populate(task));

		});

		// set end date on status change
		this.form.status.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(
				status => {

					const currentStatus = status === TaskState.completed || status === TaskState.abandoned;
					const endDate = this.form.end.value;
					if (currentStatus)
						if (endDate === null)
							this.form.end.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));

				}
			);

	}

	onSave(): void {

		if (this.form.fg.invalid)
			return;

		const { id, name } = this.project();
		const task: Partial<Task> = { ...this.form.fg.value as Partial<Task>, project: { id, name } };
		if (task.id)
			this.update.emit({ id: task.id, task });
		else
			this.create.emit(task);

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

	onToggleOptional(): void {

		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(TAG_OPTIONAL) ? tags.filter(v => v !== TAG_OPTIONAL) : [ TAG_OPTIONAL, ...tags ]
		);
		this.form.tags.markAsDirty();
		this.form.tags.updateValueAndValidity();

	}

}
