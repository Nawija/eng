"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type CustomMDXComponentProps = {
    className?: string;
    children?: React.ReactNode;
};

type MarkdownClientProps = {
    mdxSource: MDXRemoteSerializeResult;
    components?: {
        [key: string]: React.ComponentType<CustomMDXComponentProps>;
    };
};

export default function MarkdownClient({
    mdxSource,
    components,
}: MarkdownClientProps) {
    return <MDXRemote {...mdxSource} components={components} />;
}
