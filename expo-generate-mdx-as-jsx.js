const fs = require('fs');
const mdx = require('@mdx-js/mdx');
const glob = require('glob');

const mdxFiles = glob.sync('./content/**/*.mdx');
console.log("Generating JSX files from MDX articles");

const mdxJsxFiles = mdxFiles.map(mdxFile => {

  const mdxText = fs.readFileSync(
    mdxFile,
    'utf8',
  );

  const jsx = `
/* @jsx mdx */
import { mdx } from '@mdx-js/react';
${mdx.sync(mdxText).replace('/* @jsx mdx */', '')}
`;

  const outputFile = mdxFile + '.jsx';
  fs.writeFileSync(outputFile, jsx);
  return outputFile;
});

console.log(mdxJsxFiles);
