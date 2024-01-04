import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutofocusDirective, BookmarkComponent, InputModule, NoDataPipe, PortalComponent, SanitizeHtmlPipe, SelectedTagsComponent, TagCloudComponent, TimePastPipe, ToastModule } from '@lib';
import { InputTagModule } from 'lib/components/input-tag/input-tag.module';
import { SelectModule } from 'lib/components/select/select.module';
import { CdkMenuModule } from '@angular/cdk/menu';

@NgModule({
	declarations: [
		BookmarkComponent,
		PortalComponent,
		// SelectedTagsComponent,
		TagCloudComponent,
		// ToastComponent,
		// ToastWrapperComponent,
		AutofocusDirective,
		NoDataPipe,
		SelectedTagsComponent,
		TimePastPipe,
		SanitizeHtmlPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		InputTagModule,
		ToastModule,
		InputModule,
		CdkMenuModule
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
		InputTagModule,
		InputModule,
		TimePastPipe,
		SanitizeHtmlPipe,
		ToastModule,
		SelectModule,
		SelectedTagsComponent,
		CdkMenuModule
	],
	providers: []
})
export class SharedModule { }
