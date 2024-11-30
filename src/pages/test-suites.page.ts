import { Component } from '@angular/core';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective,  ],
	selector: 'test-suites-page',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				routerLink="new">
				<svg wGlyph="post_add"></svg> Add
			</button>

		</w-portal>


	`,
	host: { 'class': 'page' }
})
export class TestSuitesPage extends BaseComponent { }
