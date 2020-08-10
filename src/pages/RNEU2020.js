import React from 'react';
import MDXComp from './RNEU2020MDXComp.mdx';

export default function Page() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
      }}
    >
      <MDXComp />
    </div>
  );
}
