import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Table } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ModuleReport } from '@models/database.model';
import { FormatBytesPipe } from '@pipes/format-bytes.pipe';

@Component({
	standalone: true,
	imports: [ FormatBytesPipe, GlyphDirective, DecimalPipe ],
	selector: 'app-module-report',
	templateUrl: './module-report.component.html',
	host: { 'class': 'grid' }
})
export class ModuleReportComponent extends BaseComponent {

	report = input.required<ModuleReport>();

	clear = output<Table>();

	onClear(name: Table): void {

		if (confirm(`Empty table ${name}?`))
			this.clear.emit(name);

	}

}
