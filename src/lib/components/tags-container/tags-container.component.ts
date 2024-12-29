import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphName } from '@constants/glyphs.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'w-tags-container',
	imports: [ CommonModule, RouterLink, GlyphDirective ],
	templateUrl: './tags-container.component.html',
	host: {
		'class': 'flex flex-wrap justify-end items-center gap-1 comp comp-dark py-3 px-4 min-h-14'
	}
})
export class TagsContainerComponent extends BaseComponent {

	glyph = input.required<GlyphName>();
	tags = input.required<string[]>();
	url = input.required<string[]>();

}
