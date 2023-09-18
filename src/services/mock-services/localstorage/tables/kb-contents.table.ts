import { KBContentsTable, UUID } from 'lib';

export class MockKBContentsTableImpl implements KBContentsTable {

	private contents: Record<UUID, string> = {}

	async set(key: UUID, value: string): Promise<void> {
		this.contents[key] = value;
	}

	async get<T>(key: string): Promise<T | null> {
		return (this.contents[key] ?? null) as T;
	}

	async remove(key: UUID): Promise<void> {

		delete this.contents[key];

	}

	async dump(): Promise<Map<string, any>> {
		throw new Error('Method not implemented.');
	}

}