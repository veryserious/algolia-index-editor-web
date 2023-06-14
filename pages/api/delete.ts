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
  console.log(objectID);
  //const recordDeleted = await deleteRecord(objectID);
  // add your own logging logic here
  //console.log(recordDeleted);
  // add your own validation logic here
  // res.status(200).json(recordDeleted);
  res.status(200).json({ name: "John Doe" });
}
