const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// const upstreamTransformer = require('metro-react-native-babel-transformer');
const upstreamTransformer = require(defaultConfig.transformer
  .babelTransformerPath);

// inspired by
// https://github.com/kristerkari/react-native-svg-transformer
// https://github.com/kristerkari/react-native-stylus-transformer

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.mdx')) {
    throw new Error('mdx not supported yet!');
  } else {
    return upstreamTransformer.transform({ src, filename, options });
  }
};
