import { sessionActions } from '@actions/session.actions';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionComponent } from '@components/session/session.component';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Session } from '@models/test-suite.model';
import { Store } from '@ngrx/store';
import { selSession_exam } from '@selectors/session/session-ui.selectors';

@Component({
	standalone: true,
	imports: [ GlyphDirective, ReactiveFormsModule, SessionComponent ],
	selector: 'app-session-container',
	templateUrl: './session.container.html',
	host: { 'class': 'h-full flex flex-col p-2 pt-1 md:pt-3 md:p-4' },
})
export class SessionContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected exam = this.store.selectSignal(selSession_exam);
	// protected fcChoices = nnfc([ false, false, false, false, false ], Validators.required);

	protected onClose(): void {

		this.store.dispatch(sessionActions.closeDialog());

	}

	protected onResult(session: Session): void {

		console.log(session);

	}

}
