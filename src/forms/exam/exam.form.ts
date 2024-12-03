import { Component, effect, inject, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { RequiredValidatorDirective } from '@directives/required-validator.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ChoicesComponent } from '@libComponents/choices/choices.component';
import { InputComponent } from '@libComponents/input/input.component';
import { PortalComponent } from '@libComponents/portal.component';
import { TextareaComponent } from '@libComponents/textarea/textarea.component';
import { NameBase } from '@models/id-base.model';
import { Exam } from '@models/test-suite.model';
import { EXAM_FORM, ExamFormImpl } from './exam-form';

@Component({
	standalone: true,
	imports: [ InputComponent, RequiredValidatorDirective, ChoicesComponent, ReactiveFormsModule, GlyphDirective, PortalComponent, TextareaComponent ],
	selector: 'app-exam-form',
	templateUrl: './exam.form.html',
	providers: [ { provide: EXAM_FORM, useClass: ExamFormImpl } ],
	host: { 'class': 'flex flex-col gap-4' }
})
export class ExamForm extends BaseComponent {

	// INPUT
	exam = input<Exam | null>(null);
	testSuite = input.required<NameBase>();

	// OUTPUT
	create = output<Partial<Exam>>();
	update = output<{ id: UUID, exam: Partial<Exam>; }>();

	protected form = inject(EXAM_FORM);

	constructor() {

		super();
		effect(() => {

			const exam = this.exam();
			if (exam) // is edit? set values
				untracked(() => this.form.populate(exam));

		});

	}

	onSave(): void {

		if (this.form.fg.invalid)
			return;

		const { id, name } = this.testSuite();
		const exam: Partial<Exam> = { ...this.form.fg.value as Partial<Exam>, testSuite: { id, name } };
		if (exam.id)
			this.update.emit({ id: exam.id, exam });
		else
			this.create.emit(exam);

	}

}
