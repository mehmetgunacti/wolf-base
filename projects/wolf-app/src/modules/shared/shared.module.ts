import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutofocusDirective, BookmarkComponent, CardModule, InputModule, NoDataPipe, PortalComponent, SelectedTagsComponent, TagCloudComponent, TimePastPipe, ToastModule } from '@lib';
import { BreadcrumbModule } from 'lib/components/breadcrumb/breadcrumb.module';
import { InputTagModule } from 'lib/components/input-tag/input-tag.module';
import { SelectModule } from 'lib/components/select/select.module';

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
		TimePastPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		InputTagModule,
		BreadcrumbModule,
		ToastModule,
		CardModule,
		InputModule
	],
	exports: [
		BreadcrumbModule,
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
		InputModule,
		TimePastPipe,
		ToastModule,
		SelectModule,
		SelectedTagsComponent
	],
	providers: []
})
export class SharedModule { }
