import { graphql } from 'gatsby';
import IndexTemplate from '../components/index';

export default IndexTemplate;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
          }
          id
          rawBody
          timeToRead
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;
