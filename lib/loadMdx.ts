import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function loadAllMdFiles(dir: string) {
    const directoryPath = path.join(process.cwd(), dir);
    const files = fs.readdirSync(directoryPath);

    const allFiles = await Promise.all(
        files.map(async (fileName) => {
            const fullPath = path.join(directoryPath, fileName);
            const source = fs.readFileSync(fullPath, "utf8");

            const { content, data } = matter(source);

            const mdxSource = await serialize(content, {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                },
                scope: data,
            });

            return {
                fileName,
                rawContent: content,
                mdxSource,
            };
        })
    );

    return allFiles;
}
