import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'modules/primeng.module';
import { PortalComponent, TagCloudComponent, ToastComponent, ToastWrapperComponent } from './components';
import { SelectedTagsComponent } from './components/selected-tags/selected-tags.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';

@NgModule({
	declarations: [
		BookmarkComponent,
		PortalComponent,
		SelectedTagsComponent,
		TagCloudComponent,
		ToastComponent,
		ToastWrapperComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		PrimeNgModule,
		ReactiveFormsModule
	],
	exports: [
		BookmarkComponent,
		PrimeNgModule,
		PortalComponent,
		SelectedTagsComponent,
		TagCloudComponent,
		ToastWrapperComponent,
		ReactiveFormsModule
	],
	providers: []
})
export class SharedModule { }
