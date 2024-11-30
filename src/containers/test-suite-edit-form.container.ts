import { entityActions } from '@actions/entity.actions';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { TestSuiteForm } from '@forms/test-suite/test-suite.form';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { TestSuite } from '@models/test-suite.model';
import { Store } from '@ngrx/store';
import { selTestSuite_selected } from '@selectors/test-suite/test-suite-ui.selectors';

@Component({
	standalone: true,
	imports: [ PortalComponent, RouterLink, TestSuiteForm, GlyphDirective ],
	selector: 'app-test-suite-edit-form-container',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				[routerLink]="['/test-suites', testSuite()?.id ]">
				<svg wGlyph="cancel"></svg> Cancel
			</button>

		</w-portal>

		<header class="mb-8 comp-title">Edit Test Suite</header>
		<app-test-suite-form [testSuite]="testSuite()" (update)="onUpdate($event.id, $event.testSuite)"/>
	`,
	host: { 'class': 'comp p-4' }
})
export class TestSuiteEditFormContainer extends BaseComponent {

	private store = inject(Store);

	testSuite = this.store.selectSignal(selTestSuite_selected);

	onUpdate(id: UUID, testSuite: Partial<TestSuite>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.testSuite, id, entity: testSuite }));

	}

}
