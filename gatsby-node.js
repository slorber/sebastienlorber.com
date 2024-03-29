exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: '/newsletter',
    toPath: 'https://thisweekinreact.com',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/chat',
    toPath: 'https://thisweekinreact.com/discord',
    isPermanent: false,
  });

  createRedirect({
    fromPath: '/twitter',
    toPath: 'https://twitter.com/sebastienlorber',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/dev',
    toPath: 'https://dev.to/sebastienlorber',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/hashnode',
    toPath: 'https://daily.sebastienlorber.com/',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/github',
    toPath: 'https://github.com/slorber',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/linkedin',
    toPath:
      'https://www.linkedin.com/in/sebastienlorber/detail/recent-activity/shares/',
    isPermanent: false,
  });

  createRedirect({
    fromPath: '/sponsor',
    toPath: 'https://thisweekinreact.com/sponsor',
    isPermanent: false,
  });

  createRedirect({
    fromPath: '/RNEU2020',
    toPath: '/talk-reactnative-jamstack-and-beyond',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/rneu2020',
    toPath: '/talk-reactnative-jamstack-and-beyond',
    isPermanent: false,
  });

  createRedirect({
    fromPath: '/app',
    toPath: 'https://expo.io/@slorber/sebastien-lorber',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/expo',
    toPath: 'https://expo.io/@slorber/sebastien-lorber',
    isPermanent: false,
  });

  createRedirect({
    fromPath: '/sizzy',
    toPath: 'https://a.paddle.com/v2/click/49831/114267?link=1947',
    isPermanent: false,
  });

  createRedirect({
    fromPath: '/coding-career-handbook',
    // toPath: 'https://swyx.podia.com/coding-career-handbook/gozhi?coupon=LAUNCHSALE20&via=sebastienlorber',
    toPath: 'https://www.learninpublic.org/?a=gozhi',
    isPermanent: false,
  });
  createRedirect({
    fromPath: '/learninpublic',
    // toPath: 'https://swyx.podia.com/coding-career-handbook/gozhi?coupon=LAUNCHSALE20&via=sebastienlorber',
    toPath: 'https://www.learninpublic.org/?a=gozhi',
    isPermanent: false,
  });
};
