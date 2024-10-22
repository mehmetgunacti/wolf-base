import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, ElementRef, forwardRef, inject, input, InputSignal, signal, viewChild, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'w-textarea',
	standalone: true,
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent implements ControlValueAccessor {

	private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	// Input
	label: InputSignal<string> = input.required();
	rows: InputSignal<number> = input(10);
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
