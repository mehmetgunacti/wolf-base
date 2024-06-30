import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from './switch.component';

@NgModule({

	declarations: [SwitchComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [SwitchComponent]

})
export class SwtichModule { }
