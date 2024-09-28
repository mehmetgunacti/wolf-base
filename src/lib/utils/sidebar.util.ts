import { SidebarState } from 'lib/constants';

export function evaluate(state: SidebarState, bigScreen: boolean): SidebarState {

	console.log('evaluate incoming', state);
	const a = evaluate1(state, bigScreen);
	console.log('evaluate outgoing', a);
	return a;

}

export function evaluate1(state: SidebarState, bigScreen: boolean): SidebarState {

	if (bigScreen) {

		if (state === SidebarState.FULL) return SidebarState.BIG_FULL;
		if (state === SidebarState.HALF) return SidebarState.BIG_HALF;
		if (state === SidebarState.HIDDEN) return SidebarState.BIG_HIDDEN;
		return state;

	}

	if (state === SidebarState.BIG_FULL) return SidebarState.FULL;
	if (state === SidebarState.BIG_HALF) return SidebarState.HALF;
	if (state === SidebarState.BIG_HIDDEN) return SidebarState.HIDDEN;

	return state;

}

export function nextState(state: SidebarState, bigScreen: boolean): SidebarState {

	console.log('nextState incoming', state);
	const a = nextState1(state, bigScreen);
	console.log('nextState outgoing', a);
	return a;

}
export function nextState1(state: SidebarState, bigScreen: boolean): SidebarState {

	if (bigScreen) {

		if (state === SidebarState.BIG_FULL) return SidebarState.BIG_HIDDEN;
		if (state === SidebarState.BIG_HALF) return SidebarState.BIG_FULL;
		if (state === SidebarState.BIG_HIDDEN) return SidebarState.BIG_HALF;
		if (state === SidebarState.FULL) return SidebarState.HIDDEN;
		if (state === SidebarState.HALF) return SidebarState.FULL;
		if (state === SidebarState.HIDDEN) return SidebarState.FULL;

	}

	if (state === SidebarState.BIG_FULL) return SidebarState.BIG_HIDDEN;
	if (state === SidebarState.BIG_HALF) return SidebarState.BIG_FULL;
	if (state === SidebarState.BIG_HIDDEN) return SidebarState.BIG_HALF;
	if (state === SidebarState.FULL) return SidebarState.HIDDEN;
	if (state === SidebarState.HALF) return SidebarState.FULL;
	if (state === SidebarState.HIDDEN) return SidebarState.FULL;

	throw Error('Unreachable code');

}

export function afterResize(state: SidebarState, bigScreen: boolean): SidebarState {

	console.log('afterResize incoming', state, bigScreen);
	const e = afterResize1(state, bigScreen);
	console.log('afterResize incoming', state, bigScreen);
	return e;

}


export function afterResize1(state: SidebarState, bigScreen: boolean): SidebarState {

	if (bigScreen) {

		if (state === SidebarState.FULL) return SidebarState.BIG_FULL;
		if (state === SidebarState.HALF) return SidebarState.BIG_HALF;
		if (state === SidebarState.HIDDEN) return SidebarState.BIG_HIDDEN;
		if (state === SidebarState.BIG_FULL) return SidebarState.FULL;
		if (state === SidebarState.BIG_HALF) return SidebarState.HALF;
		if (state === SidebarState.BIG_HIDDEN) return SidebarState.HIDDEN;

	}

	if (state === SidebarState.BIG_FULL) return SidebarState.FULL;
	if (state === SidebarState.BIG_HALF) return SidebarState.HALF;
	if (state === SidebarState.BIG_HIDDEN) return SidebarState.HIDDEN;
	if (state === SidebarState.FULL) return SidebarState.BIG_FULL;
	if (state === SidebarState.HALF) return SidebarState.BIG_HALF;
	if (state === SidebarState.HIDDEN) return SidebarState.BIG_HIDDEN;

	throw Error('Unreachable code');

}

export function hideSidebar(bigScreen: boolean): SidebarState {

	return bigScreen ? SidebarState.BIG_HIDDEN : SidebarState.HIDDEN;

}
