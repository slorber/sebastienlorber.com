import React, { ComponentType } from 'react';
import AppBlogPostListGenerated from './AppBlogPostList.generated';
import { sortBy } from 'lodash';

export type AppBlogPost = {
  default: ComponentType<{}>,
  frontmatter: {
    slug: string;
    title: string;
    author: string;
    date: string;
    hero: { uri: string };
    excerpt: string;
    secret?: boolean;
  };
};

let BlogPosts = AppBlogPostListGenerated as AppBlogPost[];

// Sort by date
BlogPosts = sortBy(
  BlogPosts,
  (blogPost) => blogPost.frontmatter.date,
).reverse();

const ShowSecretBlogPostsInDev = false; // toggle this if needed

// Remove blog posts with secret: true frontmatter
BlogPosts =
  __DEV__ && ShowSecretBlogPostsInDev
    ? BlogPosts
    : BlogPosts.filter((blogPost) => !blogPost.frontmatter.secret);

export const AppBlogPosts = BlogPosts;

AppBlogPosts.forEach((p) => {
  // add ability, to infer a slug automatically?
  if (!p.frontmatter.slug) {
    throw new Error(
      'Blog post slug frontmatter is required for the mobile app',
    );
  }
});

export const getBlogPostBySlug = (slug: string): AppBlogPost => {
  const blogPost = AppBlogPosts.find((p) => p.frontmatter.slug === slug);
  if (!blogPost) {
    throw new Error('no post found for slug=' + slug);
  }
  return blogPost;
};
