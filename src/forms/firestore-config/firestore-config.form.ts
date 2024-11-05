import { Component, effect, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective } from '@directives';
import { BaseComponent, InputComponent } from '@libComponents';
import { FirestoreConfig } from '@models';
import { configForm } from './firestore-config-form';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, GlyphDirective, InputComponent ],
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
