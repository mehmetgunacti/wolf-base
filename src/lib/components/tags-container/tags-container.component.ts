import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlyphName } from '@constants';
import { GlyphDirective } from '@libComponents';

@Component({
	selector: 'w-tags-container',
	standalone: true,
	imports: [ CommonModule, RouterModule, GlyphDirective ],
	templateUrl: './tags-container.component.html',
	host: {
		'class': 'flex justify-end items-center gap-1 shadow-component comp-dark py-3 px-4 rounded-lg min-h-14'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsContainerComponent {

	glyph = input.required<GlyphName>();
	tags = input.required<string[]>();
	url = input.required<string[]>();

}
