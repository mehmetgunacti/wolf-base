import { Component, effect, inject, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ChoicesComponent } from '@libComponents/choices/choices.component';
import { Exam, Session } from '@models/test-suite.model';
import { fc, nnfc } from '@utils/form.util';
import { SESSION_STORE, SessionStore, SessionStoreImpl } from './session.store';
import { TextareaComponent } from "../../lib/components/textarea/textarea.component";

@Component({
	standalone: true,
	imports: [GlyphDirective, ChoicesComponent, ReactiveFormsModule, TextareaComponent],
	selector: 'app-session',
	templateUrl: './session.component.html',
	providers: [ { provide: SESSION_STORE, useClass: SessionStoreImpl } ],
	host: {
		'class': 'flex flex-col gap-1 md:gap-2 flex-1'
	}
})
export class SessionComponent extends BaseComponent {

	protected readonly NOT_STARTED: number = -1;

	// Input
	exam = input.required<Exam>();

	// Output
	result = output<Session>();

	protected store: SessionStore = inject(SESSION_STORE);
	protected fcChoices = nnfc<boolean[]>([]);
	protected fcNote = fc<string | null>(null);

	constructor() {

		super();

		// update formcontrol value
		effect(() => {

			const status = this.store.status();
			const currentQuestion = this.store.currentQuestion();
			const currentAnswer = this.store.currentAnswer();
			if (status === 'ongoing' && currentQuestion)
				untracked(
					() => {

						this.fcChoices.setValue(currentAnswer?.choices ?? []);
						this.fcNote.setValue(currentAnswer?.note ?? null);

					}
				);
			else if (status === 'finished')
				untracked(
					() => this.result.emit(this.store.result)
				);

		});

	}

	protected start(): void {

		this.store.start(this.exam());

	}

	protected next(questionId: UUID): void {

		this.store.next(questionId, this.fcChoices.value, this.fcNote.value);

	}

	protected prev(questionId: UUID): void {

		this.store.prev(questionId, this.fcChoices.value, this.fcNote.value);

	}

}
