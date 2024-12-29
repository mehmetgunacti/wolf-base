import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowcaseContainer } from '@containers/showcase/showcase.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ ShowcaseContainer, RouterLink, GlyphDirective ],
	selector: 'showcase-page',
	template: `
		<a	[routerLink]="['/settings']"
			class="flex gap-1 focus-visible:bg-component-dark-hover shadow-component comp-dark comp-dark-active comp-dark-hover p-2 rounded-lg focus-visible:ring-4 focus-visible:ring-outline text-sm focus-visible:outline-none"
			tabindex="0">
			<svg wGlyph="settings" class="text-[1.2em]"></svg>
			Settings
		</a>
		<app-showcase-container/>
	`,
	host: { 'class': 'page' }
})
export class ShowcasePage extends BaseComponent { }
