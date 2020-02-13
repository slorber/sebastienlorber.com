exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: '/newsletter',
    toPath: 'https://www.getrevue.co/profile/sebastien-lorber',
    isPermanent: true,
  });
};
