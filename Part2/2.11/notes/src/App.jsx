import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);
  return (
    <ul>
      {notes.map((note, index) => {
        return <li key={index}>{note.content}</li>;
      })}
    </ul>
  );
}

export default App;
