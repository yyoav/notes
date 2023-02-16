import { Document, ObjectId, WithId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req: { query: { noteId: any; }; }, res: { json: (arg0: WithId<Document>[]) => void; }) => {
    const { noteId } = req.query
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");

       const notes = await db
           .collection("comments")
           .find({_id:new ObjectId(noteId)})
           .limit(10)
           .toArray();

       res.json(notes);
   } catch (e) {
       console.error(e);
   }
};