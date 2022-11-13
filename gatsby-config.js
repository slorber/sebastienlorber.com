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
      {
        name: `stackoverflow`,
        url: `https://stackoverflow.com/users/82609/sebastien-lorber`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/sebastienlorber/`,
      },
      {
        name: `devto`,
        url: `https://dev.to/sebastienlorber`,
      },
      {
        name: `mailto`,
        url: `mailto:lorber.sebastien+website@gmail.com`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-native-web`,
    'gatsby-plugin-resolve-src',
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        authorsPage: true,
        contentPosts: 'content/posts',
        contentAuthors: 'content/authors',
        basePath: '/',
        mailchimp: true,
        sources: {
          local: true,
          contentful: false,
        },
      },
    },
    /*
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://gmail.us4.list-manage.com/subscribe/post?u=5150dccbaa8d2e62d2aa5a921&amp;id=adf9b01764',
      },
    },
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sébastien Lorber`,
        short_name: `Sébastien Lorber`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-131003556-1',
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://sebastienlorber.com`,
      },
    },
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: 'sebastienlorber.com', // webmention.io username
        identity: {
          github: 'slorber',
          twitter: 'sebastienlorber', // no @
        },
        mentions: true,
        pingbacks: true,
        //forwardPingbacksAsWebmentions: "https://example.com/endpoint",
        domain: 'sebastienlorber.com',
        fetchLimit: 10000, // number of webmentions to fetch
        token: 'y7ZYx9itzOXhfeaKm20w5w',
      },
    },
  ],
};
