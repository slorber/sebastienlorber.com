import novelaTheme from '@narative/gatsby-theme-novela/src/gatsby-plugin-theme-ui';

// to customize, see:
// https://github.com/narative/gatsby-theme-novela/tree/master/%40narative/gatsby-theme-novela/src/gatsby-plugin-theme-ui

const theme = {
  ...novelaTheme,
  // initialColorMode: `dark`,
  colors: {
    ...novelaTheme.colors,
    //primary: '#000',
    //secondary: '#73737D',
    //accent: '#6166DC',
    //grey: '#73737D',
    //background: '#fff',
  },
};

// console.debug({theme});

export default theme;
