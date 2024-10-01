import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FirestoreConfig } from 'lib';
import { configForm } from './firestore-config-form';

@Component({
	selector: 'app-firestore-config-form',
	templateUrl: './firestore-config-form.component.html',
	styleUrls: ['./firestore-config-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestoreConfigFormComponent {

	config = input.required<FirestoreConfig>();

	save = output<FirestoreConfig>();

	form = configForm;

	constructor() {

		effect(() => {

			const conf = this.config();
			if (conf)
				this.form.setValue(conf);

		}, { allowSignalWrites: true });

	}

	onSave(): void {

		if (this.form.valid)
			this.save.emit(this.form.value as FirestoreConfig);

	}

}
