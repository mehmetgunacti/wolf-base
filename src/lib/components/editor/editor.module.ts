import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorTableModule } from '../selector-table/selector-table.module';
import { EditorComponent } from './editor.component';

@NgModule({

	declarations: [EditorComponent, ],
	imports: [CommonModule, ReactiveFormsModule, CdkMenuModule, SelectorTableModule],
	exports: [EditorComponent]

})
export class EditorModule { }
