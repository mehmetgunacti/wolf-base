import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { GlyphData, Glyphs } from '@constants';

@Component({
	standalone: true,
	selector: 'w-glyph',
	templateUrl: './glyph.component.html',
	styleUrl: './glyph.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlyphComponent {

	name = input.required<keyof typeof Glyphs>();
	protected glyphData: Signal<GlyphData> = computed(() => Glyphs[this.name()] ?? Glyphs['question_diamond']);
	// href = computed(() => {

	// 	const cacheBuster = environment.production ? '' : `?v=${Date.now()}`;
	// 	return `glyphs.svg${cacheBuster}#${this.name()}`;

	// });

}
