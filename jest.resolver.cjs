module.exports = (path, options) => {
  // Handle punycode alternative
  if (path === 'punycode') {
    return require.resolve('tr46/lib/mappingTable.json');
  }
  
  // Handle URL and other web APIs
  if (path.startsWith('node:')) {
    return require.resolve(path.slice(5));
  }

  // Handle whatwg-url and URL-related modules
  if (path === 'whatwg-url' || path === 'url' || path === 'tr46') {
    return options.defaultResolver(path, {
      ...options,
      conditions: ['node', 'require']
    });
  }

  return options.defaultResolver(path, {
    ...options,
    packageFilter: pkg => {
      // Ensure we use the CommonJS version for these packages
      if (pkg.name === 'whatwg-url' || pkg.name === 'tr46') {
        delete pkg.exports;
        delete pkg.module;
        pkg.main = pkg.main || 'lib/index.js';
      }
      return pkg;
    },
    conditions: ['node', 'require']
  });
};