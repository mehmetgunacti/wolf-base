import { KBContent, KBContentsRepository, UUID } from '@lib';

export class MockKBContentsRepositoryImpl implements KBContentsRepository {

	// updated: new Date().toISOString(),
	private contents: Record<UUID, KBContent> = {}

	async set(key: UUID, value: KBContent): Promise<void> {
		this.contents[key] = value;
	}

	async get(key: string): Promise<KBContent | null> {
		return (this.contents[key] ?? null) as KBContent;
	}

	async remove(key: UUID): Promise<void> {

		delete this.contents[key];

	}

	async dump(): Promise<Map<string, any>> {
		throw new Error('Method not implemented.');
	}

}
