import { Component, effect, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective } from '@directives/glyph.directive';
import { RequiredValidatorDirective } from '@directives/required-validator.directive';
import { BaseComponent } from '@libComponents/base.component';
import { InputComponent } from '@libComponents/input/input.component';
import { FirestoreConfig } from '@models/configuration.model';
import { configForm } from './firestore-config-form';

@Component({
	imports: [ RequiredValidatorDirective, ReactiveFormsModule, GlyphDirective, InputComponent ],
	selector: 'app-firestore-config-form',
	templateUrl: './firestore-config.form.html',
	host: { 'class': 'flex flex-col' }
})
export class FirestoreConfigForm extends BaseComponent {

	// Input
	config = input.required<FirestoreConfig | null>();

	// Output
	save = output<FirestoreConfig>();

	// Form
	form = configForm;

	constructor() {

		super();
		effect(() => {

			const conf = this.config();
			if (conf)
				untracked(() => this.form.setValue(conf));

		});

	}

	onSave(): void {

		if (this.form.valid)
			this.save.emit(this.form.value as FirestoreConfig);

	}

}
