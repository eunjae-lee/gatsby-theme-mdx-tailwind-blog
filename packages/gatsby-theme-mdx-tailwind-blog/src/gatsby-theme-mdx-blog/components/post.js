import React from 'react';
import { MDXProvider } from '@mdx-js/react';

const tagWithClassName = (Tag, className) => ({ children, ...props }) => (
  <Tag {...props} className={className}>
    {children}
  </Tag>
);

export default ({
  children,
  pageContext: {
    frontmatter: { title, description, date },
  },
}) => {
  return (
    <MDXProvider
      components={{
        h1: tagWithClassName(
          'h1',
          'text-gray-800 mt-8 mb-4 -ml-1 text-xl font-extrabold tracking-wider'
        ),
        h2: tagWithClassName(
          'h2',
          'text-gray-800 mt-8 mb-4 -ml-1 text-xl font-bold tracking-wide'
        ),
        h3: tagWithClassName(
          'h3',
          'text-gray-800 mt-8 mb-4 -ml-1 text-lg font-bold'
        ),
        h4: tagWithClassName(
          'h4',
          'text-gray-800 mt-8 mb-4 -ml-1 text-lg font-semibold'
        ),
        h5: tagWithClassName(
          'h5',
          'text-gray-800 mt-8 mb-4 -ml-1 text-lg font-medium'
        ),
        h6: tagWithClassName(
          'h6',
          'text-gray-800 mt-8 mb-4 -ml-1 text-base font-semibold'
        ),
        p: tagWithClassName(
          'p',
          'text-gray-800 leading-relaxed font-light mt-2 mb-4'
        ),
        a: tagWithClassName(
          'a',
          'text-blue-700 hover:text-blue-500 leading-relaxed font-medium mb-8'
        ),
        blockquote: tagWithClassName(
          'blockquote',
          'border-solid border-l-4 border-gray-300 pl-4'
        ),
        ul: tagWithClassName('ul', 'list-disc ml-4'),
        ol: tagWithClassName('ol', 'list-decimal ml-4'),
      }}
    >
      <article className="mt-16 ml-8 mr-8 mb-16">
        <h2 className="text-2xl text-gray-800 font-extrabold">{title}</h2>
        <p className="text-lg text-gray-800 mb-16 font-light">{description}</p>
        {children}
      </article>
    </MDXProvider>
  );
};
