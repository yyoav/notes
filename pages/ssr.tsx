import clientPromise from "../lib/mongodb";
import { Note } from "../types/note";

export default function Notes({ notes}: {notes:Note[]}): JSX.Element {
    return (
        <div>
            <h1> 20 Notes (SSR)</h1>
            {notes.map((note) => (
                <div key={note._id}>
                    <p>Name: {note.name}</p>
                    <p>Comment: {note.text}</p>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const notes = await db
            .collection("comments")
            .find({})
            .limit(20)
            .toArray();

        return {
            props: { notes: JSON.parse(JSON.stringify(notes)) },
        };
    } catch (e) {
        console.error(e);
    }
}