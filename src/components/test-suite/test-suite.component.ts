import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { TestSuite } from '@models/test-suite.model';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';

@Component({
	standalone: true,
	imports: [ GlyphDirective, RouterLink, HideEnumPipe ],
	selector: 'app-test-suite',
	templateUrl: './test-suite.component.html',
	host: {
		'class': 'flex flex-col'
	}
})
export class TestSuiteComponent extends BaseComponent {

	// Input
	testSuite = input.required<TestSuite>();

}
