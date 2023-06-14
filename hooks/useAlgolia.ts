import { Product } from "@/types";

export function useAlgolia() {
  async function deleteRecord(objectID: string) {
    const res = await (
      await fetch("/api/delete", {
        method: "POST",
        body: JSON.stringify({ objectID: objectID }),
      })
    ).json();
  }

  const updateRecord = async (product: Product) => {
    const res = await (
      await fetch("/api/update", {
        method: "POST",
        body: JSON.stringify(product),
      })
    ).json();
  };

  return { deleteRecord, updateRecord };
}
