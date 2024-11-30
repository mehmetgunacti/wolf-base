import { Component, effect, inject, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { RequiredValidatorDirective } from '@directives/required-validator.directive';
import { BaseComponent } from '@libComponents/base.component';
import { InputComponent } from '@libComponents/input/input.component';
import { TestSuite } from '@models/test-suite.model';
import { TEST_SUITE_FORM, TestSuiteFormImpl } from './test-suite-form';
import { TextareaComponent } from "../../lib/components/textarea/textarea.component";

@Component({
	standalone: true,
	imports: [RequiredValidatorDirective, InputComponent, ReactiveFormsModule, GlyphDirective, TextareaComponent],
	selector: 'app-test-suite-form',
	templateUrl: './test-suite.form.html',
	providers: [ { provide: TEST_SUITE_FORM, useClass: TestSuiteFormImpl } ]
})
export class TestSuiteForm extends BaseComponent {

	// Input
	testSuite = input<TestSuite | null>(null);

	// Output
	create = output<Partial<TestSuite>>();
	update = output<{ id: UUID, testSuite: Partial<TestSuite>; }>();

	form = inject(TEST_SUITE_FORM);

	constructor() {

		super();
		effect(() => {

			const testSuite = this.testSuite();
			if (testSuite)
				untracked(() => this.form.populate(testSuite));

		});

	}

	onSave(): void {

		if (this.form.fg.invalid)
			return;

		const testSuite: Partial<TestSuite> = this.form.fg.value as Partial<TestSuite>;
		if (testSuite.id)
			this.update.emit({ id: testSuite.id, testSuite });
		else
			this.create.emit(testSuite);

	}

}
