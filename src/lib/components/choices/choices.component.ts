import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'w-choices',
	templateUrl: './choices.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ChoicesComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()',
		'class': 'inline-flex px-2 items-center relative min-h-widget-height border border-transparent hover:border-outline rounded-lg focus-visible:ring-4 focus-visible:ring-outline outline-none group'
	}
})
export class ChoicesComponent extends BaseComponent implements ControlValueAccessor {

	// Input
	label = input.required<string>();
	readonly = input<boolean>(false);

	protected value = signal<boolean[]>([]);
	protected disabled = signal<boolean>(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: boolean[]): void { this.value.set(value); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	protected inc(): void {

		this.value.update(val => { val.push(false); return val; });
		this.onChange(this.value());
		this.onTouched();

	}

	protected dec(): void {

		this.value.update(val => { val.length = val.length === 1 ? val.length : val.length - 1; return val; });
		this.onChange(this.value());
		this.onTouched();

	}

	protected toggle(idx: number): void {

		this.value.update(val => {

			val[ idx ] = !val[ idx ];
			return val;

		});
		this.onChange(this.value());
		this.onTouched();

	}

	protected onKeyDown(event: KeyboardEvent, idx: number) {

		if (event.key === ' ' || event.key === 'Enter') {

			event.preventDefault();
			this.toggle(idx);

		}

	}

	onBlur(): void {

		this.onTouched();

	}

	onHostFocus(): void {

		// this.inputElement().nativeElement.focus();

	}

}
