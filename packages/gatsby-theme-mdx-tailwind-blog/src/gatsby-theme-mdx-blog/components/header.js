import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

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
      <>
        <h1 className="p-8 text-lg text-gray-800">
          <Link to="/">{title}</Link>
        </h1>
        <div className="px-8 pb-16">
          <p className="text-base text-gray-600">{author}</p>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </>
    )}
  />
);
