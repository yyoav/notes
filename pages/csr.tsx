
import { useState, useEffect } from 'react';

interface INote{
    _id:string;
    name:string;
    text:string;
}

export default function CSRNotes() {
  const [notes, setNotes] = useState<INote[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!notes) return <p>No notes data</p>

  return (
    <div>
        <h1> 100 Notes (CSR)</h1>
        {notes.map((note) => (
            <div key={note._id}>
                <p>Name: {note.name}</p>
                <p>Comment: {note.text}</p>
            </div>
        ))}
    </div>
);
}