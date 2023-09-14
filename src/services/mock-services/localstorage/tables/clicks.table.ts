import { ClicksTable } from "lib";
import { Click } from "lib/models";

export class MockClicksTableImpl implements ClicksTable {

	private bookmarks_clicks: Map<string, Click> = new Map();

	async click(id: string): Promise<void> {

		const click = this.bookmarks_clicks.get(id);
		if (click) {

			click.current += 1;
			click.total += 1;

		} else

			this.bookmarks_clicks.set(id, {

				id,
				current: 1,
				total: 1

			});

	}

	async listClicked(): Promise<Click[]> {

		const clicks = Array.from(this.bookmarks_clicks.values());
		return clicks.filter(c => c.current > 0);

	}

	async storeClicks(items: Click[]): Promise<number> {

		for (const item of items)
			this.bookmarks_clicks.set(item.id, item);
		return items.length;

	}

	async listAll(): Promise<Click[]> {

		return Array.from(this.bookmarks_clicks.values());

	}

}