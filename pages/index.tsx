import { Inter } from "next/font/google";
import { searchClient } from "@/lib/algolia";
import { InstantSearch, Hits } from "react-instantsearch-hooks-web";
import Pagination from "@/components/Pagination";
import Product from "@/models/product";
import Hit from "@/components/Hit";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <InstantSearch
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
      >
        <Hits hitComponent={Hit} />
        <Pagination />
      </InstantSearch>
    </main>
  );
}
