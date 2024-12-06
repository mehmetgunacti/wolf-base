import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';
import { selTestSuite_EntityList } from '@selectors/entity/entity-test-suite.selectors';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective, HideEnumPipe ],
	selector: 'app-test-suites-container',
	templateUrl: './test-suites.container.html',
	host: { 'class': 'comp p-4' }
})
export class TestSuitesContainer extends BaseComponent {

	private testSuites = inject(Store).selectSignal(selTestSuite_EntityList);
	protected sorted = computed(() => this.testSuites().sort((a, b) => a.name.localeCompare(b.name)));

}
