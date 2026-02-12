#!/usr/bin/env node

import path from 'path';
import { readFile } from 'fs/promises';
import { loadPyodide } from 'pyodide';

export async function downloadPackages() {
	console.log('Setting up pyodide + micropip');
	
	try {
		const pyodide = await loadPyodide({
			packageCacheDir: 'static/pyodide'
		});
	} catch (err) {
		console.error('Failed to load Pyodide:', err);
		console.warn('Skipping pyodide package download – continuing build');
		return;
	}

	const rawPackageJson = await readFile('../package.json', 'utf-8');
	const packageJson = JSON.parse(rawPackageJson.replace(/^﻿/, ''));
	const pyodideVersion = packageJson.dependencies.pyodide.replace('^', '');

	try {
		const pyodidePackageJson = JSON.parse(await readFile('static/pyodide/package.json', 'utf8'));
		const pyodidePackageVersion = pyodidePackageJson.version.replace(/^['"]/, '');
		if (pyodideVersion !== pyodidePackageVersion) {
			console.log('Pyodide version mismatch, removing static/pyodide directory');
			await import('fs/promises').then(fs => fs.rm('static/pyodide', { recursive: true }));
		}
	} catch (err) {
		console.error('Failed to install Pyodide packages:', err);
	}
}
