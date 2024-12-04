import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { TestSuitesContainer } from "../containers/test-suites/test-suites.container";

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, TestSuitesContainer, RouterLink ],
	selector: 'test-suites-page',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				routerLink="new">
				<svg wGlyph="post_add"></svg> Add
			</button>

		</w-portal>

		<app-test-suites-container/>
	`,
	host: { 'class': 'page' }
})
export class TestSuitesPage extends BaseComponent { }
