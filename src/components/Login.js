import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("login started")
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        console.log(response)
        const json = await response.json()
        if (json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully","success")
        }
        else{
            // alert("Invalid Credentials")
            props.showAlert("Invalid Details","danger")
        }

        
    }
    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})

    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={handleChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text ">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={handleChange} value={credentials.password} id="password" name="password" />
                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </>
    )
}
            