try {
	require('child_process');
	require('fs');
} catch (e) {
	console.error(`Modules 'child_process' and 'fs' not installed.`);
}

const execSync = require('child_process').execSync;
const writeFileSync = require('fs').writeFileSync;

const args = process.argv.slice(2);
const version = args[0] || 'patch';
console.log('Version:', version);

const READ_BRANCH = 'git rev-parse --abbrev-ref HEAD';
const UPDATE_PACKAGE_JSON_VERSION = `npm version ${version} --no-git-tag-version`;
const OBTAIN_COMMIT_COUNT = 'git rev-list --count main';
const GIT_AMEND = 'git add -A && git commit -a --amend --no-edit';
const GIT_PUSH_ORIGIN_MAIN = 'git push origin main';
const TAG = (package_json_version) => `git tag -a v${package_json_version} -m "Version ${package_json_version}"`;
const GIT_PUSH_ORIGIN_TAG = (package_json_version) => `git push origin v${package_json_version}`;

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

function runVersionScript() {

	// check if current branch is 'main'
	console.log();
	console.log('Checking current branch...');
	const branch = exec(READ_BRANCH);
	if (branch !== 'main')
		throw new Error('Current branch is not main!');
	console.log(`Currently on branch '${branch}'.`);

	// update 'version' in package.json..
	console.log();
	console.log(`Updating '${version}' version in package.json...`);
	exec(UPDATE_PACKAGE_JSON_VERSION);
	console.log(`Property 'version' of package.json updated.`);

	// read package.json version
	console.log();
	console.log(`Reading 'version' property of package.json...`);
	const package_json_version = require('./package.json').version;
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

runVersionScript();