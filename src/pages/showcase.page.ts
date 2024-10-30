import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';
import { ShowcaseContainer } from "../containers/showcase/showcase.container";

@Component({
	selector: 'showcase-page',
	standalone: true,
	imports: [ShowcaseContainer],
	template: `
		<app-showcase-container/>
	`,
	host: { 'class': 'page' }
})
export class ShowcasePage extends BaseComponent { }
