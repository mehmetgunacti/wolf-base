import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoDataPipe, PortalComponent, BookmarkComponent, TagCloudComponent, ToastModule } from '@lib';

@NgModule({
	declarations: [
		BookmarkComponent,
		PortalComponent,
		// SelectedTagsComponent,
		TagCloudComponent,
		// ToastComponent,
		// ToastWrapperComponent,
		NoDataPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		ToastModule
	],
	exports: [
		BookmarkComponent,
		PortalComponent,
		// SelectedTagsComponent,
		TagCloudComponent,
		// ToastWrapperComponent,
		// ToastModule,
		ReactiveFormsModule,
		NoDataPipe
	],
	providers: []
})
export class SharedModule { }
