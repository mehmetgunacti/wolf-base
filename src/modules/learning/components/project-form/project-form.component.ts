import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { UUID, Learning, isInvalid, LEARNING_STATUS, LearningStatus } from 'lib';
import { filter, tap } from 'rxjs';
import { LEARNING_FORM, LearningForm } from './learning-form';

@Component({
	selector: 'app-learning-form',
	templateUrl: './learning-form.component.html',
	styleUrls: ['./learning-form.component.scss'],
	providers: [{ provide: LEARNING_FORM, useClass: LearningForm }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningFormComponent {

	LEARNING_STATUS = LEARNING_STATUS;
	LearningStatus = LearningStatus;

	/* @Input() */
	learning = input<Learning | null>(null);

	@Output() create: EventEmitter<Partial<Learning>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, learning: Partial<Learning> }> = new EventEmitter();

	form: LearningForm = inject(LEARNING_FORM);

	constructor() {

		// on incoming 'learning' set form values
		toObservable(this.learning).pipe(

			takeUntilDestroyed(),
			filter((learning): learning is Learning => learning !== null),
			tap(learning => this.form.setValue(learning))

		).subscribe();

	}

	onSave(): void {

		const formGroup = this.form.formGroup();
		if (isInvalid(formGroup))
			return;

		const learning: Partial<Learning> = formGroup.value as Partial<Learning>;
		if (learning.id)
			this.update.emit({ id: learning.id, learning });
		else
			this.create.emit(learning);

	}

}
