import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CroppieModule } from '@lib';
import { SharedModule } from 'modules/shared/shared.module';
import { NoteRoutingModule } from './note-routing.module';
import * as fromConfig from './note.config';
import { MarkdownModule } from 'lib/components/markdown';
import { HideEnumModule } from 'lib/pipes/hide-enum.pipe';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		NoteRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		CroppieModule,
		MarkdownModule,
		HideEnumModule
	]
})
export class NoteModule { }
