import React from 'react';
import { Link } from 'gatsby';

export default ({ data }) =>
  data.allMdx.edges.map(({ node }) => (
    <article key={node.fields.slug}>
      <h1>
        <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
      </h1>
      <footer>
        <p>{node.frontmatter.date}</p>
      </footer>
    </article>
  ));
