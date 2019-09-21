import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import { SEO } from 'gatsby-theme-mdx-blog';
import Post from './post';

const withHeaderInfo = Comp => () => (
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
    }) => <Comp title={title} author={author} description={description} />}
  />
);

// const IndexHeader = () => (
//   <StaticQuery
//     query={graphql`
//       query {
//         site {
//           siteMetadata {
//             title
//             author
//             description
//           }
//         }
//       }
//     `}
//     render={({
//       site: {
//         siteMetadata: { title, author, description },
//       },
//     }) => (
//       <header>
//         <h1 className={`pt-10 px-8 text-xl text-gray-800 font-bold`}>
//           <Link to="/">{author}</Link>
//         </h1>
//         <div className="px-8 pb-4">
//           <p className="text-base text-gray-700 font-light">
//             {description}
//             <span className="px-4 text-gray-500">|</span>
//             <Link to="/about" className="text-blue-700 hover:text-blue-500">
//               More
//             </Link>
//           </p>
//         </div>
//         <hr className="my-4 mx-8" />
//       </header>
//     )}
//   />
// );

const IndexHeader = withHeaderInfo(({ author, description }) => (
  <header>
    <h1 className={`pt-10 px-8 text-xl text-gray-800 font-medium`}>
      <Link to="/">{author}</Link>
    </h1>
    <div className="px-8 pb-4">
      <p className="text-base text-gray-700 font-light">
        {description}
        <span className="px-4 text-gray-500">|</span>
        <Link to="/about" className="text-blue-700 hover:text-blue-500">
          More
        </Link>
      </p>
    </div>
    <hr className="my-4 mx-8" />
  </header>
));

const PostFooter = withHeaderInfo(({ author, description }) => (
  <footer className="mb-8">
    <hr className="my-4 mx-8" />
    <p className={`pt-6 px-8 text-xl text-gray-800 text-right mr-4`}>
      <Link to="/">{author}</Link>
    </p>
    <div className="px-8 pb-4">
      <p className="text-base text-gray-700 font-light text-right mr-4">
        {description}
      </p>
    </div>
  </footer>
));

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
      {isPostContext ? (
        <>
          <Post {...props}>{children}</Post>
          <PostFooter />
        </>
      ) : (
        <>
          <IndexHeader />
          <div className={className}>{children}</div>
        </>
      )}
    </div>
  );
}

export default Layout;
