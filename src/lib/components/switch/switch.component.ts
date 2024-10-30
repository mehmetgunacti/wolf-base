import { Component, forwardRef, input, model, ModelSignal, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-switch',
	standalone: true,
	imports: [ FormsModule ],
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitchComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(keydown)': 'onKeyDown($event)',
		'(click)': 'onInput()'
	}
})
export class SwitchComponent extends BaseComponent implements ControlValueAccessor {

	// Input
	label = input<string>('');

	// Model
	value: ModelSignal<boolean> = model<boolean>(false);
	protected disabled = signal<boolean>(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: boolean): void { this.value.set(value); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	protected onInput(): void {

		this.value.update(val => !val);
		this.onChange(this.value());
		this.onTouched();

	}

	protected onBlur(): void {

		this.onTouched();

	}

	protected onKeyDown(event: KeyboardEvent): void {

		if (event.key === 'Enter' || event.key === ' ') {

			event.preventDefault();
			event.stopPropagation();
			this.onInput();

		}

	}

}
