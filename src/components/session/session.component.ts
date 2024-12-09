import { Component, effect, inject, input, output, signal, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ChoicesComponent } from '@libComponents/choices/choices.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Exam, Session } from '@models/test-suite.model';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';
import { nnfc } from '@utils/form.util';
import { SessionStore } from './session.store';

@Component({
	standalone: true,
	imports: [ HideEnumPipe, GlyphDirective, PortalComponent, ChoicesComponent, ReactiveFormsModule ],
	selector: 'app-session',
	templateUrl: './session.component.html',
	providers: [ SessionStore ],
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

	protected store = inject(SessionStore);
	protected fcChoices = nnfc<boolean[]>([]);

	constructor() {

		super();
		// update formcontrol value
		effect(() => {

			const status = this.store.status();
			const currentQuestion = this.store.currentQuestion();
			if (status === 'ongoing' && currentQuestion)
				untracked(
					() => this.fcChoices.setValue(
						new Array(currentQuestion.answers.length).fill(false)
					)
				);

		});

	}

	protected start(): void {

		this.store.init(this.exam());

	}

	protected next(): void {

		this.store.next();

		// init session object
		// 		if (this.idx() === this.NOT_STARTED) {
		//
		// 			const { id, name, questions } = this.exam();
		// 			this.session = {
		//
		// 				id: uuidv4(),
		// 				name: name,
		// 				exam: { id, name },
		// 				answers: questions.reduce(
		// 					(acc, answer) => {
		//
		// 						acc[ answer.id ] = {
		//
		// 							id: answer.id,
		// 							choices: [],
		// 							start: new Date().toISOString(),
		// 							end: null
		//
		// 						};
		// 						return acc;
		//
		// 					},
		// 					{} as Record<UUID, Answer>
		// 				),
		// 				start: new Date().toISOString(),
		// 				end: null
		//
		// 			};
		//
		// 		}
		//
		// 		// increase index
		// 		this.idx.update(val => val + 1);
		//
		// 		// update session object's answers with user's choice
		// 		if (this.idx() <= this.numberOfQuestions()) {
		//
		// 			const currentQuestionId = this.currentQuestion().id;
		//
		// 			const choices = this.fcChoices.value;
		// 			//console.log(currentQuestionId, choices);
		// 			if (this.session?.answers[ currentQuestionId ])
		// 				this.session.update(s => {
		//
		// 					//console.log(s && s.answers[ currentQuestionId ]);
		// 					if (s && s.answers[ currentQuestionId ])
		// 						return produce(
		//
		// 							s,
		// 							draft => { draft.answers[ currentQuestionId ].choices = choices; }
		//
		// 						);
		// 					return s;
		//
		// 				});
		// 			this.fcChoices.setValue(
		// 				new Array(this.exam().questions[ this.idx() ].answers.length).fill(false)
		// 			);
		//
		// 		} else
		// 			this.finish();

	}

	protected prev(): void {

		this.store.prev();

	}

	// 	protected finish(): void {
	//
	// 		this.session.update(s => {
	//
	// 			if (s)
	// 				return { ...s, end: new Date().toISOString() };
	// 			return null;
	//
	// 		});
	// 		const result = this.session();
	// 		if (result)
	// 			this.result.emit(result);
	//
	// 	}

}
