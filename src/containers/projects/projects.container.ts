import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { selProject_filtered } from '@selectors';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective ],
	selector: 'app-projects-container',
	templateUrl: './projects.container.html',
	host: { 'class': 'comp p-4' }
})
export class ProjectsContainer extends BaseComponent {

	private projects = inject(Store).selectSignal(selProject_filtered);
	protected sorted = computed(() => this.projects().sort((a, b) => a.name.localeCompare(b.name)));

}
