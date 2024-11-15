import { computed, Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { Glyphs } from '@constants/glyphs.constant';

@Directive({
	standalone: true,
	selector: '[wGlyph]'
})
export class GlyphDirective implements OnInit {

	private el = inject(ElementRef);

	wGlyph = input.required<keyof typeof Glyphs>();
	protected glyphData = computed(() => Glyphs[ this.wGlyph() ] ?? Glyphs[ 'question_diamond' ]);

	ngOnInit() {
		const data = this.glyphData();

		const svgEl = this.el.nativeElement as SVGElement;

		// width
		// 		if (svgEl.getAttribute('width') === null)
		// 			svgEl.setAttribute('width', data.width);
		//
		// 		// height
		// 		if (svgEl.getAttribute('height') === null)
		// 			svgEl.setAttribute('height', data.height);

		// viewBox
		svgEl.setAttribute('viewBox', data.viewBox);

		data.d.forEach(d => {

			const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			pathEl.setAttribute('d', d);
			svgEl.appendChild(pathEl);

		});

	}

}
