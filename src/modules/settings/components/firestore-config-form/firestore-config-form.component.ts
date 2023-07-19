import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FirestoreConfig } from 'lib';
import { FirestoreConfigForm, EditFormImpl } from './firestore-config-form';

@Component({
	selector: 'app-firestore-config-form',
	templateUrl: './firestore-config-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestoreConfigFormComponent implements OnInit, OnChanges {

	@Input() config: FirestoreConfig | null | undefined;

	@Output() save: EventEmitter<FirestoreConfig> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	form: FirestoreConfigForm = new EditFormImpl();

	ngOnInit(): void {

		if (this.config)
			this.form.setValues(this.config);

	}

	ngOnChanges(changes: SimpleChanges): void {


		const config: FirestoreConfig = changes['config']?.currentValue;
		if (config)
			this.form.patchValue({ ...config });

	}

	onSave(): void {

		if (this.form.isInvalid())
			return;

		this.save.emit(this.form.value);

	}

	onCancel(): void {

		this.cancel.emit();

	}

}
