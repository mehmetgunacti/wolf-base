import { Component, input } from '@angular/core';
import { GlyphName } from '@constants/glyphs.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '../base.component';

@Component({
	imports: [ GlyphDirective ],
	selector: 'w-alert',
	templateUrl: './alert.component.html',
	host: {
		'class': 'flex items-center border rounded-lg min-h-[calc(1.5*var(--widget-height))] shadow-component',

		'[class.text-primary-text]': 'severity() === "primary"',
		'[class.bg-primary]': 'severity() === "primary"',
		'[class.border-primary]': 'severity() === "primary"',

		'[class.text-success-text]': 'severity() === "success"',
		'[class.bg-success]': 'severity() === "success"',
		'[class.border-success]': 'severity() === "success"',

		'[class.text-info-text]': 'severity() === "info"',
		'[class.bg-info]': 'severity() === "info"',
		'[class.border-info]': 'severity() === "info"',

		'[class.text-warn-text]': 'severity() === "warn"',
		'[class.bg-warn]': 'severity() === "warn"',
		'[class.border-warn]': 'severity() === "warn"',

		'[class.text-error-text]': 'severity() === "error"',
		'[class.bg-error]': 'severity() === "error"',
		'[class.border-error]': 'severity() === "error"',
	}
})
export class AlertComponent extends BaseComponent {

	// Input
	glyph = input<GlyphName | null>(null);
	severity = input<'primary' | 'success' | 'info' | 'warn' | 'error'>('primary');
	summary = input.required<string>();
	detail = input<string | null>(null);

}
