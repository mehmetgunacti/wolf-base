import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutofocusDirective, FormatBytesPipe, InputModule, NoDataPipe, PortalComponent, SanitizeHtmlModule, SelectedTagsComponent, TimePastModule, ToastModule } from '@lib';
import { DisplayModule } from 'lib/components/display/display.module';
import { InputTagModule } from 'lib/components/input-tag/input-tag.module';
import { SelectModule } from 'lib/components/select/select.module';
import { SwtichModule } from 'lib/components/switch/switch.module';
import { TagCloudModule } from 'lib/components/tag-cloud/tag-cloud.module';
import { TextareaModule } from 'lib/components/textarea';
import { LanguagePipe } from 'lib/pipes/language.pipe';
import { TypePipe } from 'lib/pipes/type.pipe';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { LanguagesComponent } from './languages/languages.component';
import { NoteHeaderComponent } from './note-header/note-header.component';
import { WordComponent } from './word/word.component';

@NgModule({
	declarations: [
		BookmarkComponent,
		NoteHeaderComponent,
		PortalComponent,
		AutofocusDirective,
		NoDataPipe,
		SelectedTagsComponent,
		FormatBytesPipe,
		WordComponent,
		LanguagesComponent,
		LanguagePipe,
		TypePipe

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
		SanitizeHtmlModule,
		DisplayModule,
		TimePastModule,
		TextareaModule,
		SwtichModule
	],
	exports: [
		BookmarkComponent,
		NoteHeaderComponent,
		PortalComponent,
		AutofocusDirective,
		ReactiveFormsModule,
		NoDataPipe,
		FormatBytesPipe,
		InputTagModule,
		InputModule,
		TimePastModule,
		ToastModule,
		SelectModule,
		SelectedTagsComponent,
		CdkMenuModule,
		TagCloudModule,
		SanitizeHtmlModule,
		DisplayModule,
		TextareaModule,
		SwtichModule,
		WordComponent,
		LanguagesComponent
	],
	providers: []
})
export class SharedModule { }
