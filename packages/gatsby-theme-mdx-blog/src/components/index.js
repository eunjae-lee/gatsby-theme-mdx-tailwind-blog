import React from 'react';
import Layout from './layout';
import PostList from './postList';

export default ({ data }) => {
  return (
    <Layout title={data.site.siteMetadata.title}>
      <PostList data={data} />
    </Layout>
  );
};
