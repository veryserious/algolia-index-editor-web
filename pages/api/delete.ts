import type { NextApiRequest, NextApiResponse } from "next";
import { deleteRecord } from "@/lib/algolia";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { objectID } = JSON.parse(req.body);
  const recordDeleted = await deleteRecord(objectID);
  res.status(200).json(recordDeleted);
}
