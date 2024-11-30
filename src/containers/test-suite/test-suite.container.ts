import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestSuiteComponent } from '@components/test-suite/test-suite.component';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Store } from '@ngrx/store';
import { selTestSuite_selected } from '@selectors/test-suite/test-suite-ui.selectors';

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, CdkMenuModule, RouterLink, TestSuiteComponent ],
	selector: 'app-test-suite-container',
	templateUrl: './test-suite.container.html',
	host: { 'class': 'flex flex-col gap-2' }
})
export class TestSuiteContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected testSuite = this.store.selectSignal(selTestSuite_selected);

}
