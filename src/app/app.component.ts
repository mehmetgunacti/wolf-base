import { Component } from "@angular/core";
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ RouterOutlet ],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	title = "wolf-base";

	constructor() {

		const a = this.abc("");

	}

	abc(a: string): string {

		console.log();
		return '';

	}

}
