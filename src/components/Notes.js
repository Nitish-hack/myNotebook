
import { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import Noteitem from "./Noteitem"
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const { notes, getNotes ,editNote} = useContext(NoteContext);
  const navigate = useNavigate();
  const [note, setNote] = useState({ _id:"",title: "", description: "", tag: "" })

  const ref = useRef(null);
  const refClose = useRef(null);
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });      
  }

const handleClick=()=>{
  editNote(note._id,note.title,note.description,note.tag);
refClose.current.click();
props.showAlert("successfully updated","success")
}

  useEffect(() => {       //this will run only once after rendering of app  it fetches notes from db and add it to note state
    if(localStorage.getItem('token')){
    console.log(getNotes());
    }
    else{
    navigate("/login");
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  


  const updateNote = (currentNote) => {
    setNote(currentNote);
    ref.current.click();
  
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" style={{ display: "none" }} data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">EditNote</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name='description' onChange={handleChange} value={note.description} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} value={note.tag} minLength={5} required/>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.title.length<5 || note.description.length<5}  onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>




      <div className="container mt-4">
        <h1 className=' text-center my-3'>Your Notes</h1>
        <h5 className='text-center'>{notes.length===0 && "no notes available"}</h5>
        <div className="row ">
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
          })}
        </div>
      </div>
    </>
  )
}

export default Notes