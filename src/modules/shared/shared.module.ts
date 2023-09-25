import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PortalComponent, TagCloudComponent, ToastComponent, ToastWrapperComponent } from './components';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { SelectedTagsComponent } from './components/selected-tags/selected-tags.component';
import { NoDataPipe } from './pipes';

@NgModule({
	declarations: [
		BookmarkComponent,
		PortalComponent,
		SelectedTagsComponent,
		TagCloudComponent,
		ToastComponent,
		ToastWrapperComponent,
		NoDataPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule
	],
	exports: [
		BookmarkComponent,
		PortalComponent,
		SelectedTagsComponent,
		TagCloudComponent,
		ToastWrapperComponent,
		ReactiveFormsModule,
		NoDataPipe
	],
	providers: []
})
export class SharedModule { }
