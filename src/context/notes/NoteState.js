import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesinitial = []
  const [notes, setNotes] = useState(notesinitial)
  //Get all Note
  const getNotes = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMjc1M2VkM2YxNjNhNjk0OTNjOGJlIn0sImlhdCI6MTY5Njc2NzE0NH0.1iYjOqR3mxeEdokXvdxQGo8rAkwQ3UAPhEzxShEiqEU',
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  //Add Note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMjc1M2VkM2YxNjNhNjk0OTNjOGJlIn0sImlhdCI6MTY5Njc2NzE0NH0.1iYjOqR3mxeEdokXvdxQGo8rAkwQ3UAPhEzxShEiqEU',
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    console.log("adding a new note")
    setNotes(notes.concat(note))
    console.log(note)

  }
  //Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMjc1M2VkM2YxNjNhNjk0OTNjOGJlIn0sImlhdCI6MTY5Njc2NzE0NH0.1iYjOqR3mxeEdokXvdxQGo8rAkwQ3UAPhEzxShEiqEU',
      }

    });
    const json = await response.json()
    console.log(json)
    if (response.ok) {
      // If deletion was successful in the backend, update the local state
      setNotes(notes => notes.filter(note => note._id !== id));
    } else {
      console.error("Failed to delete note", json);
    }

  }
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMjc1M2VkM2YxNjNhNjk0OTNjOGJlIn0sImlhdCI6MTY5Njc2NzE0NH0.1iYjOqR3mxeEdokXvdxQGo8rAkwQ3UAPhEzxShEiqEU',
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json)
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;