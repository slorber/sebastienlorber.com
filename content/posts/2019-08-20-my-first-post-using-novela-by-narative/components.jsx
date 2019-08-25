import React from 'react';
import { withTheme } from 'emotion-theming';

export const TestMDXButton = withTheme(({ theme: { colors } }) => {
  return (
    <div css={{ display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={() => alert('it works')}
        css={{
          border: 'solid',
          borderColor: colors.articleText,
          color: colors.articleText,
          borderRadius: 10,
          padding: 10,
          marginBottom: 30,
        }}
      >
        Click me!
      </button>
    </div>
  );
});
