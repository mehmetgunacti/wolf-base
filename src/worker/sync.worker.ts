/// <reference lib="webworker" />


let isRunning = false;
console.log('worker  running.');

addEventListener('message', async (a: MessageEvent) => {

	if (isRunning) {

		console.log('already running.');
		return;

	}

	console.log('running batch:', a);
	isRunning = true;
	// const generators: AsyncGenerator<SyncState>[] = createActions();

	// for (const gen of generators)
	// 	await process(gen);

	postMessage({ status: 2 });
	isRunning = false;

});
