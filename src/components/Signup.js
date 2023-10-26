import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {

    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        const {name,email,password} = credentials
        console.log("signup under process")
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json)

        if (!response.ok) {
            // console.error(json.error || "Signup failed");
            // alert(json.error || "User Already Exists");
            props.showAlert("Invalid Credentials","danger")
            return;
        }
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successfully","success")

    }
    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label my-3">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} aria-describedby="nameHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} minLength={5}required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} minLength={5}required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
