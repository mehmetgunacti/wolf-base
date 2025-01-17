import { examActions } from '@actions/exam.actions';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamDetailsComponent } from '@components/exam-details/exam-details.component';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';
import { selExam_detailsEntity, selExam_detailsSessions } from '@selectors/exam/exam-ui.selectors';

@Component({
	imports: [ GlyphDirective, ReactiveFormsModule, ExamDetailsComponent, HideEnumPipe ],
	selector: 'app-exam-details-container',
	templateUrl: './exam-detail.container.html',
	host: { 'class': 'h-full flex flex-col p-2 pt-1 md:pt-3 md:p-4' },
})
export class ExamDetailsContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected exam = this.store.selectSignal(selExam_detailsEntity);
	protected sessions = this.store.selectSignal(selExam_detailsSessions);

	protected onClose(): void {

		this.store.dispatch(examActions.closeDetailsDialog());

	}

}
