export interface KeyValueRepository<T = string, KEY = string> {

	set(key: KEY, value: T): Promise<void>;
	get(key: KEY): Promise<T | null>;
	remove(key: KEY): Promise<void>;

	dump(): Promise<Map<string, any>>;

}
