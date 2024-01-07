import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutofocusDirective, BookmarkComponent, InputModule, NoDataPipe, PortalComponent, SanitizeHtmlModule, SelectedTagsComponent, TimePastPipe, ToastModule } from '@lib';
import { InputTagModule } from 'lib/components/input-tag/input-tag.module';
import { SelectModule } from 'lib/components/select/select.module';
import { TagCloudModule } from 'lib/components/tag-cloud/tag-cloud.module';

@NgModule({
	declarations: [
		BookmarkComponent,
		PortalComponent,
		AutofocusDirective,
		NoDataPipe,
		SelectedTagsComponent,
		TimePastPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		InputTagModule,
		ToastModule,
		InputModule,
		CdkMenuModule,
		TagCloudModule,
		SanitizeHtmlModule
	],
	exports: [
		BookmarkComponent,
		PortalComponent,
		AutofocusDirective,
		ReactiveFormsModule,
		NoDataPipe,
		InputTagModule,
		InputModule,
		TimePastPipe,
		ToastModule,
		SelectModule,
		SelectedTagsComponent,
		CdkMenuModule,
		TagCloudModule,
		SanitizeHtmlModule
	],
	providers: []
})
export class SharedModule { }
