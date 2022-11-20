import React from 'react'
import {Link,useLocation, useNavigate} from 'react-router-dom';
const Navbar = (props) => {
let navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
    props.showAlert("logged out successfully","success");
  }
    let location=useLocation();
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light nav-design p-3">
  <div className="container-fluid">
    <Link className="navbar-brand text-white fs-4 fw-bold fst-italic" to="/">📒myNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link  text-white fs-5 fw-lighter fields ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li> 
        <li className="nav-item">
          <Link className={`nav-link  text-white fs-5 fw-lighter fields ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">About</Link>
        </li>
      </ul>
      {
         localStorage.getItem('token')?
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        
      

      :<form className="d-flex" role="search">
      <Link to="/login" className="btn btn-primary  ms-2" tabIndex="-1" role="button" aria-disabled="true">Login</Link>
      <Link to="/signup" className="btn btn-primary  ms-2" tabIndex="-1" role="button" aria-disabled="true">SignUp</Link>
      </form>

      }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar