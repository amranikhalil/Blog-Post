import React from 'react';

import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import mdxComponent from '@/helpers/mdx-component';
export async function generateMetadata({params}){

  const {frontmatter,content}= await loadBlogPost(params.postSlug)
  return{
    title:`Bites & Bytes ${frontmatter.title}`

  }
}  
async function BlogPost({params}) {
  const {frontmatter,content}= await loadBlogPost(params.postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote 
        source={content}
        components={mdxComponent}
        />
      </div>
    </article>
  );
}

export default BlogPost;
