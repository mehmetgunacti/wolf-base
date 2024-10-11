import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextareaComponent } from './textarea.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({

	declarations: [TextareaComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [TextareaComponent]

})
export class TextareaModule { }
