import clientPromise from "../lib/mongodb";
import { Note } from "../types/note";

export default function ISRNotes({ notes}: {notes:Note[]}): JSX.Element {

    return (
        <div>
            <h1>200 Notes (ISG)</h1>
            {notes.map((note) => (
                <div key={note._id}>
                    <p>Name: {note.name}</p>
                    <p>Comment: {note.text}</p>
                </div>
            ))}
        </div>
    );
}


export async function getStaticProps() {
    try {
        const client = await clientPromise;

        const db = client.db("sample_mflix");

        const notes = await db
            .collection("comments")
            .find({})
            .limit(200)
            .toArray();

        return {
            props: { notes: JSON.parse(JSON.stringify(notes)),revalidate: 10 },
        };
    } catch (e) {
        console.error(e);
        return {
            redirect: {
                destination: '/',
                statusCode: 307
            }
        }
    }
}
