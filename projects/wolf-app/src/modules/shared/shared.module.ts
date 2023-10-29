import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutofocusDirective, BookmarkComponent, CardModule, InputModule, NoDataPipe, PortalComponent, TagCloudComponent, ToastModule } from '@lib';
import { InputTagModule } from 'lib/components/input-tag/input-tag.module';

@NgModule({
	declarations: [
		BookmarkComponent,
		PortalComponent,
		// SelectedTagsComponent,
		TagCloudComponent,
		// ToastComponent,
		// ToastWrapperComponent,
		AutofocusDirective,
		NoDataPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		InputTagModule,
		ToastModule,
		CardModule,
		InputModule
	],
	exports: [
		BookmarkComponent,
		PortalComponent,
		// SelectedTagsComponent,
		TagCloudComponent,
		// ToastWrapperComponent,
		// ToastModule,
		AutofocusDirective,
		ReactiveFormsModule,
		NoDataPipe,
		CardModule,
		InputTagModule,
		InputModule
	],
	providers: []
})
export class SharedModule { }
