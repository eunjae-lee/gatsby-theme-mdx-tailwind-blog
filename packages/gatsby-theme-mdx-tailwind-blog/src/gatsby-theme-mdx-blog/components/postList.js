import React from 'react';
import { Link } from 'gatsby';

export default ({ data }) => (
  <section className="p-8">
    {data.allMdx.edges.map(({ node }) => (
      <article key={node.fields.slug} className="mb-16">
        <h1 className="text-xl text-gray-800">
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </h1>
        <p className="text-lg text-gray-600">
          {node.excerpt}
          <Link to={node.fields.slug} className="ml-2 text-blue-600">
            Read →
          </Link>
        </p>
      </article>
    ))}
  </section>
);
