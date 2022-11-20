import React,{useContext} from 'react'
import NoteContext from "../context/notes/noteContext";

const colors=["whitesmoke","#32a85a","#32a889","#329ca8","#324ea8","#a832a4","#9ea832"]
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Noteitem = (props) => {
  const {note,updateNote}=props;   //destructuring 
  const {deleteNote} =useContext(NoteContext);
  let number = getRandomNumber(0,6);
  let color=colors[number];
  return (
    <div className="col-lg-3 ms-3 card  mb-3" style={{maxWidth: "18rem",fontFamily: 'Rubik',backgroundColor:color}}>
  
  <div className="card-body">
  <div className="d-flex justify-content-between">
    <h5 className="card-title"><u>{note.title}</u></h5>      
    <div className="icons"> 
    <i className="fa-solid fa-pen fs-4 ms-2" onClick={()=>{
        updateNote(note)
        
    }}></i>
    </div>

  </div>
    <p className="card-text">{note.description}</p>
    <div className=' d-flex justify-content-between'>
    <p className="date">{new Date(note.date).toDateString()}</p>
   
    <i className="fa-solid fa-trash fs-4" onClick={()=>{
      deleteNote(note._id);
      props.showAlert("Deleted successfull","success")
    }}></i>
    </div>
  </div>
</div>
 
  )
}

export default Noteitem

