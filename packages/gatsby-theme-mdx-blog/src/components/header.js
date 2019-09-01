import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            author
            description
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title, author, description },
      },
    }) => (
      <header>
        <p>
          {title} by {author}
        </p>
        <p>{description}</p>
      </header>
    )}
  />
);
