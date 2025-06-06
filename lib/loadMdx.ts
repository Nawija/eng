import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from "remark-gfm";

export async function loadAllMdFiles(dir: string) {
    const directoryPath = path.join(process.cwd(), dir);
    
    // Funkcja rekurencyjna do czytania plików z podfolderów
    function getAllMdFiles(dirPath: string, basePath: string = ""): Array<{ filePath: string; relativePath: string }> {
        const items = fs.readdirSync(dirPath);
        const mdFiles: Array<{ filePath: string; relativePath: string }> = [];

        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const relativePath = path.join(basePath, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Rekurencyjnie szukaj w podfolderach
                mdFiles.push(...getAllMdFiles(fullPath, relativePath));
            } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
                mdFiles.push({ filePath: fullPath, relativePath });
            }
        }

        return mdFiles;
    }

    const mdFiles = getAllMdFiles(directoryPath);

    const allFiles = await Promise.all(
        mdFiles.map(async ({ filePath, relativePath }) => {
            const source = fs.readFileSync(filePath, "utf8");
            const { content, data } = matter(source);

            // Kompiluj MDX z JSX
            const { content: compiledContent } = await compileMDX({
                source: content,
                options: {
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            });

            // Pobieranie kategorii z nazwy folderu lub z frontmatter
            const pathParts = relativePath.split(path.sep);
            const category = data.category || (pathParts.length > 1 ? pathParts[0] : "root");
            const fileName = path.basename(relativePath);

            return {
                fileName,
                rawContent: content,
                compiledContent,
                frontMatter: data,
                category,
            };
        })
    );

    return allFiles;
}