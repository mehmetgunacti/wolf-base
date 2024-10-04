import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { environment } from 'environments/environment';
import { Glyphs } from 'lib/constants';

@Component({
	standalone: true,
	selector: 'w-glyph',
	template: `<svg class="glyph"><use [attr.href]="href()"/></svg>`,
	styles: [`
		:host {

			display	: contents;
			& > .glyph {
				width	: 1.1em;
				height	: 1.1em;
				fill	: currentcolor;
				stroke	: currentcolor;
				stroke-width	: 2;
				stroke-linecap	: round;
				stroke-linejoin	: round;
			}

		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlyphComponent {

	name = input.required<keyof typeof Glyphs>();
	href = computed(() => {

		const cacheBuster = environment.production ? '' : `?v=${Date.now()}`;
		return `assets/glyphs.svg${cacheBuster}#${this.name()}`;

	});

}
