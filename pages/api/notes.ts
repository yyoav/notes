import { WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req: any, res: { json: (arg0: WithId<Document>[]) => void; }): Promise<void> => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");

       const notes = await db
           .collection("comments")
           .find({})
           .limit(10)
           .toArray();

       res.json(notes);
   } catch (e) {
       console.error(e);
   }
};