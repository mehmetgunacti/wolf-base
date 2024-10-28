import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, InputSignal, signal, viewChild, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'w-input',
	standalone: true,
	templateUrl: './input.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()',
		'class': 'inline-flex relative h-widget-height border-form-element-border bg-form-element rounded-lg focus-within:ring-4 focus-within:ring-outline w-full focus-within:outline-none group'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {

	private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	// Input
	label: InputSignal<string> = input.required();
	type: InputSignal<string> = input('text');
	labelUp: InputSignal<boolean> = input(false);
	readonly: InputSignal<boolean> = input(false);

	protected value: WritableSignal<string> = signal('');
	protected disabled: WritableSignal<boolean> = signal(false);
	protected isLabelUp = computed(() => this.labelUp() || !!this.value());

	//////////// boilerplate
	private onChange: any = () => { }
	private onTouched: any = () => { }
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string): void { this.value.set(value); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	onInput(value: string): void {

		this.value.set(value);
		this.onChange(value);
		this.onTouched();

	}

	onBlur(): void {

		this.onTouched();

	}

	onHostFocus(): void {

		this.inputElement().nativeElement.focus();

	}

}
