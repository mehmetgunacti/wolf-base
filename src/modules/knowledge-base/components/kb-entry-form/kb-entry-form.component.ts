import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KBEntry, KBEntryNode, UUID } from 'lib';
import { TreeNode } from 'primeng/api';
import { EditFormImpl, KBEntryForm, KB_ENTRY_FORM } from './kb-entry-form';

function toTreeNode(nodes: KBEntryNode[]): TreeNode<void>[] {

	return nodes.map(node => (
		{
			key: node.id,
			label: node.name,
			children: toTreeNode(node.children)
		} as TreeNode<void>
	));

}

@Component({
	selector: 'app-kb-entry-form',
	templateUrl: './kb-entry-form.component.html',
	providers: [{ provide: KB_ENTRY_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormComponent implements OnInit, OnChanges {

	@Input() kbEntry: KBEntry | null | undefined;
	@Input({ transform: toTreeNode }) parents: TreeNode<void>[] = [];

	@Output() create: EventEmitter<Partial<KBEntry>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, kbEntry: Partial<KBEntry> }> = new EventEmitter();
	@Output() delete: EventEmitter<UUID> = new EventEmitter();

	form: KBEntryForm = inject(KB_ENTRY_FORM);
	fcParentNodes = new FormControl();
	isPopular: boolean = false;

	constructor() { }

	ngOnInit(): void {

		if (this.kbEntry)
			this.form.setValues(this.kbEntry);

	}

	ngOnChanges(changes: SimpleChanges): void {

		const kbEntry: KBEntry = changes['kbEntry']?.currentValue;
		if (kbEntry)
			this.form.patchValue({
				...kbEntry,
			});

	}

	onSave(): void {

		if (this.form.isInvalid())
			return;

		const kbEntry: KBEntry = this.form.value;
		if (kbEntry.id)
			this.update.emit({ id: kbEntry.id, kbEntry });
		else
			this.create.emit(kbEntry);

	}

	onDelete(): void {

		if (!this.kbEntry)
			return;

		if (
			confirm(`
${this.kbEntry.name}

will be deleted. Continue?`)
		)
			this.delete.emit(this.kbEntry.id);

	}

	onTogglePopular(): void {

		// todo
		console.log('todo: toggle popular');

	}

	addURL(): void {

		this.form.addURL();
		console.log(this.parents);

	}

	removeURL(idx: number): void {

		this.form.removeURL(idx);

	}

	checkUrl(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;

		if (value === "h" || value === "H")
			inputElement.value = "https://www.";

	}

}
