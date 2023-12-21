import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './editor.component';

@NgModule({

	declarations: [EditorComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [EditorComponent]

})
export class EditorModule { }
