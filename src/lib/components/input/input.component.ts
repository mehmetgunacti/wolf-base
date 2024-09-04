import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, InputSignal, signal, viewChild, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'w-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {

	private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	label: InputSignal<string> = input.required();
	type: InputSignal<string> = input('text');
	labelUp: InputSignal<boolean> = input(false);
	readonly: InputSignal<boolean> = input(false);

	protected value: WritableSignal<string> = signal('');
	protected disabled: WritableSignal<boolean> = signal(false);
	protected isLabelUp = computed(() => {

		return this.labelUp() || !!this.value();

	});

	// boilerplate
	private onChange: any = () => { }
	private onTouched: any = () => { }
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }

	// new value from the form model
	writeValue(value: string): void {

		this.value.set(value);

	}

	// called when FormControl disabled or enabled state changes
	setDisabledState(isDisabled: boolean): void {

		this.disabled.set(isDisabled);

	}

	// Method that handles the change event of the checkbox
	onInput(value: string): void {

		this.value.set(value);
		this.onChange(this.value());
		this.onTouched();

	}

	onBlur(): void {

		this.onTouched();

	}

	onHostFocus(): void {

		this.inputElement().nativeElement.focus();

	}

}
