import React from 'react';
import { Link } from 'gatsby';
import Layout from './layout';

export default ({ data }) => {
  const edgesExceptAbout = data.allMdx.edges.filter(
    ({ node }) => node.fields.slug !== '/about'
  );

  return (
    <Layout title={data.site.siteMetadata.title}>
      <section className="px-8 py-4 md:py-8">
        {edgesExceptAbout.map(({ node }) => (
          <article key={node.fields.slug} className="mb-24">
            <h1 className="mb-2">
              <Link to={node.fields.slug}>
                <span className="font-title text-2r text-gray-800 leading-snug">
                  {node.frontmatter.title}{' '}
                </span>
                <span className="text-2xl text-gray-400 font-thin ml-1">→</span>
              </Link>
            </h1>
            <p className="text-xl text-gray-800 font-light">
              {node.frontmatter.description || node.excerpt}
            </p>
          </article>
        ))}
      </section>
    </Layout>
  );
};
