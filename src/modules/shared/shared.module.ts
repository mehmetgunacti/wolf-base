import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'modules/primeng.module';
import { PortalComponent, TagCloudComponent } from './components';
import { SelectedTagsComponent } from './components/selected-tags/selected-tags.component';

@NgModule({
	declarations: [
		PortalComponent,
		SelectedTagsComponent,
		TagCloudComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		PrimeNgModule,
		ReactiveFormsModule
	],
	exports: [
		PrimeNgModule,
		PortalComponent,
		SelectedTagsComponent,
		TagCloudComponent,
		ReactiveFormsModule
	],
	providers: []
})
export class SharedModule { }
