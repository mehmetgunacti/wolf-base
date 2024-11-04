try {
	await import('child_process');
	await import('fs');
} catch (e) {
	console.error(`Modules 'child_process' and 'fs' not installed.`);
}

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const args = process.argv.slice(2);
const version = args[0] || 'patch';
console.log('Version:', version);

const GIT_STATUS_PORCELAIN			= 'git status --porcelain';
const READ_BRANCH					= 'git rev-parse --abbrev-ref HEAD';
const UPDATE_PACKAGE_JSON_VERSION	= `npm version ${version} --no-git-tag-version`;
const OBTAIN_COMMIT_COUNT			= 'git rev-list --count main';
const GIT_LOCAL_REMOTE_SAME			= `git log --oneline origin/main..main`; // `git merge-base --is-ancestor origin/main main`;
const GIT_AMEND						= 'git commit -a --amend --no-edit';
const GIT_COMMIT					= (m) => `git commit -a -m "${m}"`;
const GIT_PUSH_ORIGIN_MAIN			= 'git push origin main';
const TAG							= (p) => `git tag -a v${p} -m "Version ${p}"`;
const GIT_PUSH_ORIGIN_TAG			= (p) => `git push origin v${p}`;

function argsInvalid() {

	return !['major', 'minor', 'patch'].includes(version);

}

function exec(command) {

	console.log(`Executing command: [${command}]`);
	const output = execSync(command, { encoding: 'utf-8' }).trim();
	console.log(`Command output: [${output}]`);
	return output;

}

function updateVersion(commitCount, package_json_version) {

	const versionInfo = `// this file is automatically created
export const buildInfo = {
	version: '${package_json_version}',
	builtTime: '${new Date().toISOString()}',
	builtNumber: '${commitCount}'
};`;
	writeFileSync('./src/version.ts', versionInfo);

}

async function runVersionScript() {

	/*
	*  Do checks
	*/

	if (argsInvalid())
		throw new Error('npm run gitpush "<commit message>" [major|minor|patch]');

	// check if current branch is 'main'
	console.log();
	console.log('Checking current branch...');
	const branch = exec(READ_BRANCH);
	if (branch !== 'main')
		throw new Error('Current branch is not main!');
	console.log(`Currently on branch '${branch}'.`);

	// check if git working directory is clean
	console.log();
	console.log('Checking git working directory...');
	const notEmpty = exec(GIT_STATUS_PORCELAIN);
	if (notEmpty)
		throw new Error('GIT working directory not clean!');
	console.log(`GIT working directory is clean.`);

	// check if local and remote are the same
	console.log();
	console.log('Checking if local and remote are same...');
	const same = !exec(GIT_LOCAL_REMOTE_SAME);
	console.log(`Local and remote branches are ${ same ? 'same' : 'not same '}.`);

	if (same)
		throw new Error('Local and remote branches are on same commit (create a new local commit)!');

	/*
	* Version updates: "package.json", "src/version.ts"
	*/

	// update 'version' in package.json..
	console.log();
	console.log(`Updating '${version}' version in package.json...`);
	exec(UPDATE_PACKAGE_JSON_VERSION);
	console.log(`Property 'version' of package.json updated.`);

	// read package.json version
	console.log();
	console.log(`Reading 'version' property of package.json...`);
	const data = await fs.readFile('./package.json', 'utf-8');
	const json = JSON.parse(data);
	const package_json_version = json.version;
	if (!package_json_version)
		throw new Error('package_json_version is undefined.')
	console.log(`Current version is ${package_json_version}.`);

	// obtain commit count
	console.log();
	console.log('Obtaining git commit count...');
	const commitCount = exec(OBTAIN_COMMIT_COUNT);
	console.log(`Current commit count is ${commitCount}.`);

	// update version.ts
	console.log();
	console.log('Updating version.ts file...');
	updateVersion(commitCount, package_json_version);
	console.log(`File 'src/version.ts' updated.`);

	/*
	* Git commit
	*/

	// add modifications to latest commit (amend)
	console.log();
	console.log('Amending commit...');
	exec(GIT_AMEND);
	console.log('Commit amended.');

	// push branch to remote repo
	console.log();
	console.log('Pushing to remote repository...');
	exec(GIT_PUSH_ORIGIN_MAIN);
	console.log(`Branch 'main' pushed to 'origin'.`);

	// tag the latest commit
	console.log();
	console.log('Tagging latest commit...');
	exec(TAG(package_json_version));
	console.log('Latest commit tagged.');

	// push tag to remote repo
	console.log();
	console.log(`Pushing tag v${package_json_version} to remote repository...`);
	exec(GIT_PUSH_ORIGIN_TAG(package_json_version));
	console.log(`Tag v${package_json_version} pushed to 'origin'.`);

	console.log();
	console.log('Done.');

}

await runVersionScript();
