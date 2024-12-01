import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, input, signal, viewChild, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	imports: [ CommonModule ],
	selector: 'w-textarea',
	templateUrl: './textarea.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()',
		'class': 'inline-flex relative min-h-widget-height bg-form-element border border-form-element-border hover:border-outline rounded-lg focus-within:ring-4 focus-within:ring-outline w-full outline-none group'
	}
})
export class TextareaComponent extends BaseComponent implements ControlValueAccessor {

	private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	// Input
	label = input.required<string>();
	rows = input<number>(10);
	readonly = input<boolean>(false);

	protected value: WritableSignal<string> = signal('');
	protected disabled: WritableSignal<boolean> = signal(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string): void { this.value.set(value); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	// Method that handles the change event of the checkbox
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
