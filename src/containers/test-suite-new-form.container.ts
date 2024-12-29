import { entityActions } from '@actions/entity.actions';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { TestSuiteForm } from '@forms/test-suite/test-suite.form';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { TestSuite } from '@models/test-suite.model';
import { Store } from '@ngrx/store';

@Component({
	imports: [ PortalComponent, RouterLink, TestSuiteForm, GlyphDirective ],
	selector: 'app-test-suite-new-form-container',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				[routerLink]="['/test-suites']">
				<svg wGlyph="cancel"></svg> Cancel
			</button>

		</w-portal>

		<header class="mb-8 comp-title">Add Test Suite</header>
		<app-test-suite-form (create)="onCreate($event)"/>
	`,
	host: { 'class': 'comp p-2 md:p-4' }
})
export class TestSuiteNewFormContainer extends BaseComponent {

	private store = inject(Store);

	onCreate(testSuite: Partial<TestSuite>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.testSuite, entity: testSuite }));

	}

}
