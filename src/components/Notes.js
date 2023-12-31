import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
    const context = useContext(noteContext)
    let navigate = useNavigate();
    const { notes, getNotes,editNote } = context
    useEffect(() => {
        if (localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    const handleClick = (e) => {
        console.log("updating note", note)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showAlert("Updated Successfully","success");

    }
    const updateNote = (currentNote) => {
        console.log("trying to edit")
        ref.current.click()
        console.log(ref.current)
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        // props.showAlert("Updated Successfully","success");
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" value={note.etitle} name='etitle' aria-describedby="emailHelp" placeholder="Enter Title" onChange={handleChange} minLength={5} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Description">Description</label>
                                    <input type="text" className="form-control" id="Description" value={note.edescription} placeholder="eDescription" name='edescription' onChange={handleChange} minLength={5} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control" id="tag" value={note.etag} placeholder="Tag" name="etag" onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose}  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='my-2 ' style={{textAlign:'center',color:'red',fontFamily:'fantasy'}}>Your Notes</h1>
            <div className="row my-3">
                <div className="container mx-2" style={{color:"red"}}>
                {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note, index) => {
                    return <Noteitem key={index} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}
