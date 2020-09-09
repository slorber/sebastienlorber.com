import React from 'react';
import MDXComp from './talk-reactnative-jamstack-and-beyond-comp.mdx';

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
