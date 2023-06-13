import type { NextApiRequest, NextApiResponse } from "next";
import { updateRecord } from "@/lib/algolia";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const input = JSON.parse(req.body);

  const recordUpdated = await updateRecord(input);
  console.log(recordUpdated);
  res.status(200).json(recordUpdated);
}
