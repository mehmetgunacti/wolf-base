import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CroppieModule, EditorModule, MarkdownModule } from '@lib';
import { SharedModule } from 'modules/shared/shared.module';
import { NoteRoutingModule } from './note-routing.module';
import * as fromConfig from './note.config';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		NoteRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		EditorModule,
		CroppieModule,
		MarkdownModule
	]
})
export class NoteModule { }
