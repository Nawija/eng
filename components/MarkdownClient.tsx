"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type MarkdownClientProps = {
  mdxSource: MDXRemoteSerializeResult;
  components?: Record<string, React.ComponentType<any>>;
};

export default function MarkdownClient({ mdxSource, components }: MarkdownClientProps) {
  return <MDXRemote {...mdxSource} components={components} />;
}
