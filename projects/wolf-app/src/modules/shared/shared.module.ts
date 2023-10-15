import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookmarkComponent, CardModule, NoDataPipe, PortalComponent, TagCloudComponent, ToastModule } from '@lib';
import { TagboxModule } from 'lib/components/tagbox/tagbox.module';

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
		TagboxModule,
		ToastModule,
		CardModule
	],
	exports: [
		BookmarkComponent,
		PortalComponent,
		// SelectedTagsComponent,
		TagCloudComponent,
		// ToastWrapperComponent,
		// ToastModule,
		ReactiveFormsModule,
		NoDataPipe,
		CardModule,
		TagboxModule
	],
	providers: []
})
export class SharedModule { }
