import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
    
    const context = useContext(noteContext)
    const {deleteNote} = context
    const {note,updateNote} = props
    return (
        <div className='col-md-3 row '>
            <div className="card my-3 mx-2">
                    <div className="card-body">
                        <div className="container d-flex text-align-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-4 " onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}}></i>
                        <i className="fa-regular fa-pen-to-square" onClick={()=>{
                            console.log("Edit button clicked")
                            updateNote(note);}}></i> 
                        </div>
                        <p className="card-text">{note.description}</p>
                        <h6>{note.tag}</h6>
                        <h6>{note.timestamp}</h6>
                        
                    </div>
            </div>
        </div>
    )
}
