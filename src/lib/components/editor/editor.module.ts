import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule, SanitizeHtmlModule } from 'lib/pipes';
import { SelectorTableModule } from '../selector-table/selector-table.module';
import { EditorComponent } from './editor.component';
import { DialogModule } from '@angular/cdk/dialog';
import { CardModule } from '../card';

@NgModule({

	declarations: [EditorComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CdkMenuModule,
		SelectorTableModule,
		SanitizeHtmlModule,
		MarkdownModule,
		DialogModule,
		CardModule
	],
	exports: [EditorComponent]

})
export class EditorModule { }
