import { entityActions } from '@actions/entity.actions';
import { examActions } from '@actions/exam.actions';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { ExamForm } from '@forms/exam/exam.form';
import { BaseComponent } from '@libComponents/base.component';
import { Bookmark } from '@models/bookmark.model';
import { Exam } from '@models/test-suite.model';
import { Store } from '@ngrx/store';
import { selExam_editEntity } from '@selectors/exam/exam-ui.selectors';
import { selTestSuite_selected } from '@selectors/test-suite/test-suite-ui.selectors';
import { nnfc } from '@utils/form.util';

@Component({
	standalone: true,
	imports: [ GlyphDirective, ReactiveFormsModule, ExamForm ],
	selector: 'app-exam-edit-container',
	templateUrl: './exam-edit.container.html',
	host: { 'class': 'h-full flex flex-col p-2 pt-1 md:pt-3 md:p-4' },
})
export class ExamEditContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected exam = this.store.selectSignal(selExam_editEntity);
	protected testSuite = this.store.selectSignal(selTestSuite_selected);
	protected fcChoices = nnfc([ false, false, false, false, false ], Validators.required);

	onCreate(exam: Partial<Exam>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.exam, entity: exam }));

	}

	onUpdate(id: UUID, exam: Partial<Bookmark>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.exam, id, entity: exam }));

	}

	onClose(): void {

		this.store.dispatch(examActions.closeDialog());

	}

}
