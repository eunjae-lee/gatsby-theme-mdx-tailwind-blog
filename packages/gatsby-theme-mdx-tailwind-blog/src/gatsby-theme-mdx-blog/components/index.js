import React from 'react';
import { Link } from 'gatsby';
import Layout from './layout';

export default ({ data }) => {
  return (
    <Layout title={data.site.siteMetadata.title}>
      <section className="p-8">
        {data.allMdx.edges.map(({ node }) => (
          <article key={node.fields.slug} className="mb-16">
            <h1 className="text-xl text-gray-800">
              <Link to={node.fields.slug}>
                {node.frontmatter.title}{' '}
                <span className="text-sm text-blue-700 font-light">→</span>
              </Link>
            </h1>
            <p className="text-lg text-gray-600 font-light">
              {node.frontmatter.description || node.excerpt}
            </p>
          </article>
        ))}
      </section>
    </Layout>
  );
};
