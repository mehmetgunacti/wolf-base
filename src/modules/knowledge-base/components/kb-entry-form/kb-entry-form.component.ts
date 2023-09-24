import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KBEntry, KBEntryNode, UUID } from 'lib';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Subject, Subscription } from 'rxjs';
import { EditFormImpl, KBEntryForm, KB_ENTRY_FORM } from './kb-entry-form';
import { TreeNode } from 'primeng/api';

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
export class KBEntryFormComponent implements OnInit, OnChanges, OnDestroy {

	@Input() kbEntry: KBEntry | null | undefined;
	@Input({ transform: toTreeNode }) parents: TreeNode<void>[] = [];
	@Input() tagSuggestions: string[] | null | undefined;

	@Output() create: EventEmitter<Partial<KBEntry>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, kbEntry: Partial<KBEntry> }> = new EventEmitter();
	@Output() delete: EventEmitter<UUID> = new EventEmitter();
	@Output() tagInput: EventEmitter<string> = new EventEmitter();

	@ViewChild('autocomplete') autocompleteChange!: AutoComplete;

	form: KBEntryForm = inject(KB_ENTRY_FORM);
	fcParentNodes = new FormControl();
	tagSuggestions$: Subject<string[]>;
	subscriptions: Subscription = new Subscription();
	isPopular: boolean = false;

	constructor() {

		this.tagSuggestions$ = new Subject<string[]>();

	}

	ngOnInit(): void {

		if (this.kbEntry)
			this.form.setValues(this.kbEntry);

		this.subscriptions.add(

			this.form.tags.valueChanges.subscribe(
				tags => this.isPopular = tags.includes('popular')
			)

		);

	}

	ngOnChanges(changes: SimpleChanges): void {

		const kbEntry: KBEntry = changes['kbEntry']?.currentValue;
		if (kbEntry)
			this.form.patchValue({
				...kbEntry,
			});

		const tagSuggestions: string[] = changes['tagSuggestions']?.currentValue;
		if (tagSuggestions)
			this.tagSuggestions$.next(tagSuggestions);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

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

	onTagInput(event: AutoCompleteCompleteEvent): void {

		if (event.query.endsWith(' ')) {

			this.form.tags.patchValue([
				...this.form.tags.getRawValue(),
				event.query.substring(0, event.query.length - 1)
			]);
			this.tagSuggestions$.next([]);
			if (this.autocompleteChange.multiInputEl)
				this.autocompleteChange.multiInputEl.nativeElement.value = '';

		} else
			this.tagInput.emit(event.query);

	}

	onTogglePopular(): void {

		const POPULAR = 'popular';
		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(POPULAR) ? tags.filter(v => v !== POPULAR) : [POPULAR, ...tags]
		);

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
