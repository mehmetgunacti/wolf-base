import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, model, ModelSignal, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlyphName } from '@constants/glyphs.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	imports: [ CommonModule, FormsModule, GlyphDirective ],
	selector: 'w-switch',
	templateUrl: './switch.component.html',
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
		'(click)': 'onInput()',
		'class': 'inline-flex items-center justify-between px-1 gap-2 cursor-pointer relative h-widget-height border border-transparent rounded-lg focus-within:ring-4 focus-within:ring-outline focus-within:outline-none group',
		'[class.primary]': 'severity() === "primary"',
		'[class.success]': 'severity() === "success"',
		'[class.info]': 'severity() === "info"',
		'[class.warn]': 'severity() === "warn"',
		'[class.error]': 'severity() === "error"'
	}
})
export class SwitchComponent extends BaseComponent implements ControlValueAccessor {

	// Input
	label = input<string>('');
	severity = input<'primary' | 'success' | 'info' | 'warn' | 'error'>('primary');
	glyphUnchecked = input<GlyphName | null>(null);
	glyphChecked = input<GlyphName | null>(null);

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
