import React from "react";

export default function About() {

  return (
    <div className="notesApp-aboutContainer">
      <h2 className="notesApp-aboutTitle">About iNoteBook</h2>
      <p className="notesApp-aboutDesc">
        Welcome to iNoteBook, your one-stop platform for jotting down your thoughts, ideas, and notes. Our mission is to provide you with a seamless experience to capture and organize your thoughts.
      </p>
      <ul className="notesApp-featuresList">
        <li className="notesApp-featureItem">- Store your notes securely in our database.</li>
        <li className="notesApp-featureItem">- Add new notes with ease.</li>
        <li className="notesApp-featureItem">- Modify existing notes whenever inspiration strikes.</li>
        <li className="notesApp-featureItem">- Delete notes you no longer need.</li>
      </ul>
    </div>
  )
}     