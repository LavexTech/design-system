const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add the parent directory as a watchFolder to watch the source files
config.watchFolders = [
  path.resolve(__dirname, '../src'),
];

// Configure the resolver to handle the @src alias
config.resolver.alias = {
  '@src': path.resolve(__dirname, '../src'),
};

// Ensure we can resolve modules from the parent directory
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../node_modules'),
];

module.exports = config;
