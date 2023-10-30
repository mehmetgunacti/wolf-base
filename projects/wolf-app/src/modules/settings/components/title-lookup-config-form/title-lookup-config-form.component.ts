import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-title-lookup-config-form',
	templateUrl: './title-lookup-config-form.component.html',
	styleUrls: ['./title-lookup-config-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleLookupConfigFormComponent implements OnInit, OnChanges {

	@Input() url: string | null | undefined;

	@Output() save: EventEmitter<string> = new EventEmitter();

	fcUrl: FormControl = new FormControl(null, [Validators.required]);

	ngOnInit(): void {

		if (this.url)
			this.fcUrl.setValue(this.url);

	}

	ngOnChanges(changes: SimpleChanges): void {

		const url: string = changes['url']?.currentValue;
		if (url)
			this.fcUrl.patchValue(url);

	}

	onSave(): void {

		if (this.fcUrl.invalid)
			return;

		this.save.emit(this.fcUrl.value);

	}

}
