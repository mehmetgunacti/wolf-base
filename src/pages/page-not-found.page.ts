import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'page-not-found-page',
	standalone: true,
	imports: [ GlyphDirective, RouterLink ],
	template: `
		<section class="comp m-auto p-16 flex items-center justify-center">
			<div class="flex flex-col items-center max-w-sm mx-auto text-center">
				<p class="flex items-center gap-3 flex-col sm:flex-row">
					<span class="p-3 rounded-full bg-info">
						<svg wGlyph="info" class="text-4xl"></svg>
					</span>
					<span class="text-2xl font-bold">Page not found</span>
				</p>
				<p class="mt-4 text-gray-500 dark:text-gray-400">The page you are looking for does not exist.</p>
				<div class="flex items-center w-full mt-6 gap-x-3 shrink-0 justify-center">

					<button class="btn btn-ghost" routerLink="/">
						<svg wGlyph="home" class="text-[1.3em]"></svg>
						Home
					</button>

				</div>
			</div>
		</section>
    `,
	host: { 'class': 'page h-full' }
})
export class PageNotFoundPage extends BaseComponent { }
