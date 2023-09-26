import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html'
})
export class HomePageComponent {
	isProd = environment.production;
}
