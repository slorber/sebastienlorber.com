exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: '/newsletter',
    toPath: 'https://www.getrevue.co/profile/sebastien-lorber',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/sponsor',
    toPath: 'https://gist.github.com/slorber/4015b388edbe9743048fe98d12604326',
    isPermanent: false,
    toPath: 'http://tinyletter.com/slorber',
    isPermanent: true,
  });
};
