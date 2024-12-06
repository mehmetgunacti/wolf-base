import { examActions } from '@actions/exam.actions';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExamsComponent } from '@components/exams/exams.component';
import { TestSuiteComponent } from '@components/test-suite/test-suite.component';
import { UUID } from '@constants/common.constant';
import { ExamDetailContainer } from '@containers/exam-detail/exam-detail.container';
import { ExamEditContainer } from '@containers/exam-edit/exam-edit.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ModalComponent } from '@libComponents/modal/modal.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Store } from '@ngrx/store';
import { selExam_detailsVisible, selExam_formVisible, selExam_selectedExams } from '@selectors/exam/exam-ui.selectors';
import { selTestSuite_selected } from '@selectors/test-suite/test-suite-ui.selectors';

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, CdkMenuModule, RouterLink, TestSuiteComponent, ModalComponent, ExamEditContainer, ExamsComponent, ExamDetailContainer ],
	selector: 'app-test-suite-container',
	templateUrl: './test-suite.container.html',
	host: { 'class': 'flex flex-col gap-2' }
})
export class TestSuiteContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected testSuite = this.store.selectSignal(selTestSuite_selected);
	protected exams = this.store.selectSignal(selExam_selectedExams);
	protected formVisible = this.store.selectSignal(selExam_formVisible);
	protected detailsVisible = this.store.selectSignal(selExam_detailsVisible);

	protected onOpenFormDialog(): void {

		this.store.dispatch(examActions.openFormDialog());

	}

	protected onOpenEditDialog(id: UUID): void {

		this.store.dispatch(examActions.openEditDialog({ id }));

	}

	protected onOpenDetailsDialog(id: UUID): void {

		this.store.dispatch(examActions.openDetailsDialog({ id }));

	}

	protected onCloseEditDialog(): void {

		this.store.dispatch(examActions.closeEditDialog());

	}

	protected onCloseDetailsDialog(): void {

		this.store.dispatch(examActions.closeDetailsDialog());

	}

}
