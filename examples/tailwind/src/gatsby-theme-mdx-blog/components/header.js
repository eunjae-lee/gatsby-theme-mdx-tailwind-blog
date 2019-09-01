import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

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
        file(relativePath: { eq: "profile.jpeg" }) {
          childImageSharp {
            fixed(width: 64, height: 64) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title, author, description },
      },
      file: {
        childImageSharp: { fixed },
      },
    }) => (
      <>
        <h1 className="p-8 text-lg text-gray-800">
          <Link to="/">{title}</Link>
        </h1>
        <div className="px-8 pb-16 flex">
          <Img
            fixed={fixed}
            style={{
              borderRadius: '9999px',
            }}
            alt="Profile picture"
          />
          <div className="ml-4 mt-2">
            <p className="text-base text-gray-700">{author}</p>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        </div>
      </>
    )}
  />
);
