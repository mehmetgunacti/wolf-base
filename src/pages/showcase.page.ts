import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';
import { ShowcaseContainer } from '@containers/showcase/showcase.container';

@Component({
	standalone: true,
	imports: [ ShowcaseContainer ],
	selector: 'showcase-page',
	template: `<app-showcase-container/>`,
	host: { 'class': 'page' }
})
export class ShowcasePage extends BaseComponent { }
