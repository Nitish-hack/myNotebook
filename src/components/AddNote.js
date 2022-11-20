import React, { useState, useContext } from 'react'
import NoteContext from "../context/notes/noteContext";
const AddNote = (props) => {
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note added successfully","success");
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });      //we can also do this iin long method where we check if change is in title then we change  title state else description but here we use optimised ans short form **************this syntax simply means that whatever is the name of changing field we make its state equal to value ***one point this work  coz the name of state and name we have taken are same 
    }
    return (
        <div className="container mt-4">
            <h1 className='text-center'>Add a Note</h1>
            <form >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fs-3">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleChange} minLength={5} required placeholder='Title'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-3">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={handleChange} value={note.description} minLength={5} required placeholder='Description'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label fs-3">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} value={note.tag}  placeholder='Tag'/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
export default AddNote;