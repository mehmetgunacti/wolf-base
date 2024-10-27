import { ChangeDetectionStrategy, Component, effect, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective, InputComponent } from '@libComponents';
import { FirestoreConfig } from '@models';
import { configForm } from './firestore-config-form';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, GlyphDirective, InputComponent ],
	selector: 'app-firestore-config-form',
	templateUrl: './firestore-config-form.component.html',
	host: { 'class': 'flex flex-col comp' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestoreConfigFormComponent {

	// Input
	config = input.required<FirestoreConfig>();

	// Output
	save = output<FirestoreConfig>();

	// Form
	form = configForm;

	constructor() {

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
