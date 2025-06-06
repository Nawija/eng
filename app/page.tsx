import CodeAndPreview from "@/components/CodeAndPreview";
import { loadAllMdFiles } from "../lib/loadMdx";
import MarkdownClient from "@/components/MarkdownClient";

export default async function HomePage() {
  const allFiles = await loadAllMdFiles("content");

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-10">
      {allFiles.map(({ fileName, rawContent, mdxSource }) => (
        <section key={fileName} className="border p-4 rounded-md">
          <h2 className="mb-4 text-xl font-semibold">{fileName}</h2>
          <CodeAndPreview code={rawContent} />
          <MarkdownClient mdxSource={mdxSource} />
        </section>
      ))}
    </main>
  );
}
