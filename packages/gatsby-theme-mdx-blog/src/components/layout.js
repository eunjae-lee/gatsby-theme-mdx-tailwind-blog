import React from 'react';
import SEO from './seo';
import Header from './header';
import LayoutWrapper from './layoutWrapper';
import PostWrapper from './postWrapper';

function Layout(props) {
  const { title, pageContext, children } = props;
  const { frontmatter = {} } = pageContext || {};
  const isPostContext = Boolean(pageContext);
  return (
    <LayoutWrapper>
      <SEO title={frontmatter.title || title} />
      <Header />
      {isPostContext ? (
        <PostWrapper {...props}>{children}</PostWrapper>
      ) : (
        children
      )}
    </LayoutWrapper>
  );
}

export default Layout;
