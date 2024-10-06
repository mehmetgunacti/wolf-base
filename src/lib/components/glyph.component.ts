import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { GlyphData, GlyphList, Glyphs } from 'lib/constants';

@Component({
	standalone: true,
	selector: 'w-glyph',
	// template: `<svg preserveAspectRatio="xMidYMid meet"><use [attr.href]="href()"/></svg>`,
	template: `
		@let data = glyphData();
		<svg xmlns="http://www.w3.org/2000/svg"
				[attr.width]="data.width"
				[attr.height]="data.height"
				[attr.viewBox]="data.viewBox">
				<path [attr.d]="data.d"/>
		</svg>

	`,
	styles: [`:host { display : contents; }`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlyphComponent {

	name = input.required<keyof typeof Glyphs>();
	protected glyphData: Signal<GlyphData> = computed(() => GlyphList[this.name()]);
	// href = computed(() => {

	// 	const cacheBuster = environment.production ? '' : `?v=${Date.now()}`;
	// 	return `assets/glyphs.svg${cacheBuster}#${this.name()}`;

	// });

}
