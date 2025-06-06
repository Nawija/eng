import { loadAllMdFiles } from "../lib/loadMdx";
import FilterClient from "@/components/FilterClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const allFiles = await loadAllMdFiles("content");
    const categories = Array.from(new Set(allFiles.map((f) => f.category)));

    return (
        <main>
            <FilterClient allFiles={allFiles} categories={categories} />
        </main>
    );
}
