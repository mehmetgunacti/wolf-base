import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { environment } from 'environments/environment';
import { Glyphs } from 'lib/constants';

@Component({
	standalone: true,
	selector: 'w-glyph',
	template: `<svg><use [attr.href]="href()"/></svg>`,
	styles: [`:host { display : contents; }`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlyphComponent {

	name = input.required<keyof typeof Glyphs>();
	href = computed(() => {

		const cacheBuster = environment.production ? '' : `?v=${Date.now()}`;
		return `assets/glyphs.svg${cacheBuster}#${this.name()}`;

	});

}
