import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'
// import Alert from './Alert'

export default function AddNote(props) {
    const context = useContext(noteContext)
    // eslint-disable-next-line
    const {addNote} = context

    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleSubmit = (e)=>{
       e.preventDefault()
       addNote(note.title,note.description,note.tag);
       setNote({title:"",description:"",tag:""})
       props.showAlert("Added Successfully","success");
    }

    const handleChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (

        <div className='container mt-0'>
            <h1 style={{textAlign:'center',fontFamily:'serif',color:'green'}}>Add a Note</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title"><strong>Title</strong></label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter Title" onChange={handleChange} value={note.title} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Description"><strong>Description</strong></label>
                    <input type="text" value={note.description} className="form-control" id="Description" placeholder="Description" name='description' onChange={handleChange} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag"><strong>Tag</strong></label>
                    <input type="text" value={note.tag} className="form-control" id="tag" placeholder="Tag" name="tag" onChange={handleChange} />
                </div>
                {/* <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button  type="submit" className="btn btn-primary mt-2 mb-3" onClick={handleSubmit}>Add Note</button>
                
                

            </form>
        </div>
    )
}
