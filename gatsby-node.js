exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: '/newsletter',
    toPath: 'http://tinyletter.com/slorber',
    isPermanent: true,
  });
};
