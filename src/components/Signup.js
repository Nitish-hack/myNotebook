import React,{useState }from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name:"",email:"", password:"",cpassword:"" });
    const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
      console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate('/');
      props.showAlert("Account created successfully","success")
    }
    else {
    props.showAlert("Invalid Details","danger")
    }
  }
    return (
        <div className='mt-3'>
            <h2>Signup to continue to myNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email"  className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={handleChange} required minLength={5}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" value={credentials.cpassword} id="cpassword" onChange={handleChange} required minLength={5}/>
                </div>

                <button type="submit"   className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default Signup