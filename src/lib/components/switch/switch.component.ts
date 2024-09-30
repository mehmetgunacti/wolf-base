import { ChangeDetectionStrategy, Component, effect, forwardRef, input, model, ModelSignal, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'w-switch',
	standalone: true,
	imports: [FormsModule],
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
		// '(focus)': 'onHostFocus()',
		'(click)': 'onInput()'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements ControlValueAccessor {

	// Input
	label = input<string>('');
	// checked = input<boolean>(false);
	// checked: ModelSignal<boolean> = model.required<boolean>();

	// protected value = signal<boolean>(false);
	value : ModelSignal<boolean> = model.required<boolean>();
	protected disabled = signal<boolean>(false);

	//////////// boilerplate
	private onChange: any = () => { }
	private onTouched: any = () => { }
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

}
