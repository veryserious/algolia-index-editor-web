import { Inter } from "next/font/google";
import { searchClient } from "@/lib/algolia";
import { InstantSearch, Hits } from "react-instantsearch-hooks-web";
import Pagination from "@/components/Pagination";
import { Hit } from "@/features/Hit";
import { Modal, useModal } from "@/features/Modal";
import ModalContent from "@/features/Modal/components/ModalContent";
import SearchBox from "@/components/SearchBox";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const { open, toggle } = useModal();
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center px-4 md:px-24 py-24 ${inter.className}`}
      >
        <InstantSearch
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
          searchClient={searchClient}
        >
          <SearchBox />
          <Hits
            hitComponent={Hit}
            classNames={{
              root: "w-full md:w-[80%]",
            }}
          />
          <Pagination />
        </InstantSearch>
      </main>
      <Modal open={open} onClose={toggle}>
        <ModalContent />
      </Modal>
    </>
  );
}
