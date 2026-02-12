import path from 'path';
import { readFile, rm } from 'fs/promises';
import { writeFileSync, existsSync } from 'fs';
import { loadPyodide } from 'pyodide';

let __dirname = path.dirname(__filename);
let __filename = path.basename(__filename);

const preferedProxy = process.env.HTTP_PROXY || process.env.http_proxy;


  if (preferedProxyURL) {
    const dispatcher = new ProxyAgent({ uri: preferedProxyURL });
    setGlobalDispatcher(dispatcher);
    console.log(`Initialized network proxy "${preferedProxy}" from env`);
  }
}

export async function downloadPackages() {
  console.log('Setting up pyodide + micropip');
  console.log('Script running from:', process.cwd());
  console.log('Looking for package.json at:', path.join(process.cwd(), '../package.json'));

  let pyodide;
  try {
    pyodide = await loadPyodide({
      packageCacheDir: 'static/pyodide'
    });
  } catch (err) {
    console.error('Failed to load Pyodide:', err);
    console.warn('Skipping pyodide package download – continuing build');
    return;
  }

  const rawPackageJson = await readFile('../package.json', 'utf-8');
  const packageJson = JSON.parse(rawPackageJson.replace(/^﻿/, ''));
  const pyodideVersion = packageJson.dependencies.pyodide.replace(/^['"]/, '');

  try {
    const pyodidePackageJson = JSON.parse(await readFile('static/pyodide/package.json', 'utf8'));
    const pyodidePackageVersion = pyodidePackageJson.version.replace(/^['"]/, '');
    if (pyodideVersion !== pyodidePackageVersion) {
      console.log('Pyodide version mismatch, removing static/pyodide directory');
      await rm('static/pyodide', { recursive: true });
    }
  } catch (err) {
    console.log('Pyodide package not found, proceeding with download.', err);
  }

  try {
    console.log('Loading micropip package');
    await pyodide.loadPackage('micropip');

    const micropip = pyodide.pyimport('micropip');
    const packages = pyodide.packages;

    console.log('Downloading Pyodide packages:', packages);

    try {
      const requiredPackages = packageJson.pyodidePackages || [];

      for (const pkg of requiredPackages) {
          console.log(`Installing package: ${pkg}`);
          await micropip.install(pkg);
}

    } catch (err) {
      console.error('Failed to install Pyodide packages:', err);
    }
  } catch (err) {
    console.error('Micropip loading failed:', err);
  }
}

// Call only if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  downloadPackages();
}