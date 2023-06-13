import { Product } from "@/types";
import algoliasearch from "algoliasearch";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_READONLY_KEY || ""
);

const writeClient = algoliasearch(
  process.env.ALGOLIA_APP_ID || "",
  process.env.ALGOLIA_API_WRTIE_KEY || ""
);

const index = writeClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ""
);

// TODO - add types for the expected promise return values
export const deleteRecord = async (objectID: string): Promise<any> => {
  const res = await index.deleteObject(objectID);
  return res;
};

export const updateRecord = async (record: Product): Promise<any> => {
  const res = await index.partialUpdateObject(record);
  return res;
};
