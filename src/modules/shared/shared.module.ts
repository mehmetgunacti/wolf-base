import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutofocusDirective, FormatBytesPipe, NoDataPipe, PortalComponent, SanitizeHtmlModule, SelectedTagsComponent, TimePastModule, ToastComponent, ToastWrapperComponent } from '@lib';
import { GlyphComponent } from 'lib/components/glyph/glyph.component';
import { SelectModule } from 'lib/components/select/select.module';
import { SwitchComponent } from 'lib/components/switch/switch.component';
import { TagCloudModule } from 'lib/components/tag-cloud/tag-cloud.module';
import { TextareaModule } from 'lib/components/textarea';
import { RequiredValidatorDirective } from 'lib/directives/required-validator.directive';
import { LanguagePipe } from 'lib/pipes/language.pipe';
import { TypePipe } from 'lib/pipes/type.pipe';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { LanguagesComponent } from './languages/languages.component';
import { ModalComponent } from './modal/modal.component';
import { NoteHeaderComponent } from './note-header/note-header.component';
import { WordComponent } from './word/word.component';
import { SearchBoxComponent } from 'lib/components/search-filter/search-box.component';
import { InputComponent } from 'lib/components/input/input.component';
import { InputTagComponent } from 'lib/components/input-tag/input-tag.component';

@NgModule({
	declarations: [
		NoteHeaderComponent,
		AutofocusDirective,
		RequiredValidatorDirective,
		NoDataPipe,
		SelectedTagsComponent,
		WordComponent,
		LanguagesComponent,
		LanguagePipe,
		TypePipe
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		PortalComponent,
		CdkMenuModule,
		TagCloudModule,
		InputTagComponent,
		ModalComponent,
		SanitizeHtmlModule,
		TimePastModule,
		FormatBytesPipe,
		TextareaModule,
		SwitchComponent,
		ToastWrapperComponent,
		ToastComponent,
		GlyphComponent,
		BookmarkComponent,
		InputComponent,
		SearchBoxComponent
	],
	exports: [
		BookmarkComponent,
		NoteHeaderComponent,
		PortalComponent,
		AutofocusDirective,
		RequiredValidatorDirective,
		ModalComponent,
		ReactiveFormsModule,
		NoDataPipe,
		FormatBytesPipe,
		InputTagComponent,
		InputComponent,
		TimePastModule,
		SelectModule,
		SelectedTagsComponent,
		CdkMenuModule,
		TagCloudModule,
		SanitizeHtmlModule,
		TextareaModule,
		SwitchComponent,
		WordComponent,
		LanguagesComponent,
		ToastWrapperComponent,
		ToastComponent,
		GlyphComponent,
		SearchBoxComponent
	],
	providers: []
})
export class SharedModule { }
