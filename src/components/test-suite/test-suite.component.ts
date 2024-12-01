import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slideDownTrigger } from '@animations/slide-in-out.animation';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ChoicesComponent } from '@libComponents/choices/choices.component';
import { TestSuite } from '@models/test-suite.model';

@Component({
	standalone: true,
	imports: [ GlyphDirective, RouterLink, ChoicesComponent ],
	selector: 'app-test-suite',
	templateUrl: './test-suite.component.html',
	animations: [ slideDownTrigger ],
	host: {
		'class': 'flex flex-col'
	}
})
export class TestSuiteComponent extends BaseComponent {

	// Input
	testSuite = input.required<TestSuite>();

	protected testsExpanded = signal<Record<UUID, boolean>>({});

	protected onToggleTest(id: UUID): void {

		this.testsExpanded.update(map => { map[ id ] = !map[ id ]; return map; });

	}

}
