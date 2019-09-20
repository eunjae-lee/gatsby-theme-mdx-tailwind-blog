import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import { SEO } from 'gatsby-theme-mdx-blog';
import PostWrapper from './postWrapper';

function Layout(props) {
  const { title, pageContext, className, children } = props;
  const { frontmatter = {} } = pageContext || {};
  const isPostContext = Boolean(pageContext);
  return (
    <div className="container mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2">
      <SEO
        title={frontmatter.title || title}
        description={frontmatter.description}
      />
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
            <h1 className="pt-8 pl-8 pr-8 text-xl font-bold text-gray-800">
              <Link to="/">{author}</Link>
            </h1>
            <div className="px-8 pb-8">
              <p className="text-base text-gray-700 font-light">
                {description}
                <span className="px-2 text-gray-500">|</span>
                <Link to="/about" className="text-blue-700 hover:text-blue-500">
                  More
                </Link>
              </p>
            </div>
          </header>
        )}
      />
      <hr className="m-8" />
      {isPostContext ? (
        <PostWrapper {...props}>{children}</PostWrapper>
      ) : (
        <div className={className}>{children}</div>
      )}
    </div>
  );
}

export default Layout;
