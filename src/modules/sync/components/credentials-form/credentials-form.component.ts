import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Credentials } from 'lib';
import { CredentialsForm, EditFormImpl } from './credentials-form';

@Component({
	selector: 'app-credentials-form',
	templateUrl: './credentials-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsFormComponent implements OnInit, OnChanges {

	@Input() credentials: Credentials | null | undefined;

	@Output() save: EventEmitter<Credentials> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	form: CredentialsForm = new EditFormImpl();

	ngOnInit(): void {

		if (this.credentials)
			this.form.setValues(this.credentials);

	}

	ngOnChanges(changes: SimpleChanges): void {


		const credentials: Credentials = changes['credentials']?.currentValue;
		if (credentials)
			this.form.patchValue({ ...credentials });

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
