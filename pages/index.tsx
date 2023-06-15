import { Inter } from "next/font/google";
import { searchClient } from "@/lib/algolia";
import { InstantSearch, Hits } from "react-instantsearch-hooks-web";
import Pagination from "@/components/Pagination";
import { Hit } from "@/features/Hit";
import { Modal, useModal } from "@/features/Modal";
import ModalContent from "@/features/Modal/components/ModalContent";
import SearchBox from "@/components/SearchBox";
import { Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const { open, toggle } = useModal();
  return (
    <>
      <main
        className={`flex flex-col items-center min-h-screen  px-4 md:px-24 py-24 ${inter.className}`}
      >
        <div className="w-full md:w-[80]">
          <Typography gutterBottom>
            This is a Proof of Concept application for Algolia InstantSearch
            hooks integration with Next.js that provides a basic dashboard for
            managing products.
          </Typography>
          <InstantSearch
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
            searchClient={searchClient}
          >
            <SearchBox />
            <div className="shadow-sm overflow-hidden sm:rounded-lg">
              <Hits hitComponent={Hit} />
            </div>
            <Pagination />
          </InstantSearch>
        </div>
      </main>
      <Modal open={open} onClose={toggle}>
        <ModalContent />
      </Modal>
    </>
  );
}
