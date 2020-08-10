const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

console.log('Metro config !!!', { defaultConfig });
console.log('sourceExts', defaultConfig.sourceExts);

module.exports = {};

/*
module.exports = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('./metroMdxTransformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    //sourceExts: [...defaultConfig.sourceExts, 'mdx'],
    sourceExts: defaultConfig.sourceExts,
  },
};

 */
