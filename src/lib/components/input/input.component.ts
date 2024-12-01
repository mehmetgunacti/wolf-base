import { Component, ElementRef, forwardRef, input, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base.component';

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
		'class': 'inline-flex relative h-widget-height bg-form-element border border-form-element-border rounded-lg focus-within:ring-4 focus-within:ring-outline w-full focus-within:outline-none group'
	}
})
export class InputComponent extends BaseComponent implements ControlValueAccessor {

	private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	// Input
	label = input.required<string>();
	type = input<string>('text');
	readonly = input<boolean>(false);

	protected value = signal<string>('');
	protected disabled = signal<boolean>(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
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
