import { Component } from '@angular/core';
import { ShowcaseContainer } from '@containers/showcase/showcase.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ ShowcaseContainer ],
	selector: 'showcase-page',
	template: `<app-showcase-container/>`,
	host: { 'class': 'page' }
})
export class ShowcasePage extends BaseComponent { }
