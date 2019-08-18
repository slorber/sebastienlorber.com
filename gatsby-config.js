module.exports = {
  siteMetadata: {
    title: `Sébastien Lorber`,
    description: `I'm Sébastien Lorber. I help startups be highly productive with React and React Native.`,
    name: `Sébastien Lorber`,
    siteUrl: `https://sebastienlorber.com`,
    hero: {
      heading: `Sébastien Lorber's website`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/sebastienlorber`,
      },
      {
        name: `github`,
        url: `https://github.com/slorber`,
      },
      /*
      {
        name: `stackoverflow`,
        url: `https://stackoverflow.com/users/82609/sebastien-lorber`,
      },
       */
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/sebastienlorber/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sébastien Lorber`,
        short_name: `Sébastien Lorber`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};
