import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphName } from '@constants/glyphs.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ GlyphDirective, RouterLink ],
	selector: 'w-message-box',
	template: `
		<section class="comp m-auto p-8 flex items-center justify-center">
			<div class="flex flex-col items-center max-w-sm mx-auto text-center">
				<p class="flex items-center gap-1">
					<span class="p-2 rounded-full">
						<svg [wGlyph]="glyph()" class="text-2xl"></svg>
					</span>
					<span class="text-lg font-bold">{{summary()}}</span>
				</p>
				@if (detail()) {

					<p class="mt-1 text-gray-500 dark:text-gray-400">{{detail()}}</p>

				}
				<div class="flex items-center w-full mt-1 gap-x-3 shrink-0 justify-center">

					<button class="btn btn-ghost" routerLink="/">
						<svg wGlyph="home" class="text-[1.3em]"></svg>
						Home
					</button>

				</div>
			</div>
		</section>
	`
})
export class MessageBoxComponent extends BaseComponent {

	glyph = input<GlyphName>('info');
	summary = input.required<string>();
	detail = input<string | null>(null);

}
