import { entityActions } from '@actions/entity.actions';
import { sessionActions } from '@actions/session.actions';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamDetailsComponent } from '@components/exam-details/exam-details.component';
import { SessionComponent } from '@components/session/session.component';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Session } from '@models/test-suite.model';
import { Store } from '@ngrx/store';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';
import { selSession_exam } from '@selectors/session/session-ui.selectors';

@Component({
	imports: [ GlyphDirective, ReactiveFormsModule, SessionComponent, HideEnumPipe, ExamDetailsComponent ],
	selector: 'app-session-container',
	templateUrl: './session.container.html',
	host: { 'class': 'h-full flex flex-col p-2 pt-1 md:pt-3 md:p-4' },
})
export class SessionContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected exam = this.store.selectSignal(selSession_exam);
	protected result: Session | null = null;

	protected onClose(): void {

		this.store.dispatch(sessionActions.closeDialog());

	}

	protected onResult(session: Session): void {

		this.result = session;
		this.store.dispatch(entityActions.create({ entityType: AppEntityType.session, entity: session }));

	}

}
