import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const redirectToLogin = ()=>{
        navigate("/login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials
        console.log("signup under process")
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json)

        if (!response.ok) {
            // console.error(json.error || "Signup failed");
            // alert(json.error || "User Already Exists");
            props.showAlert("Invalid Credentials", "danger")
            return;
        }
        localStorage.setItem('token', json.authtoken);
        navigate("/login");
        props.showAlert("Account Created Successfully Now login with your Credentials", "success")

    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-2'>
            <h2 style={{ color: 'red', textAlign: 'center' }}>Create Account</h2>
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
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} minLength={5} required />
                </div>
                <div className="container d-flex">
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button></div>
                    <div className='container'>
                        <h6 style={{marginLeft:'20px',marginTop:'5px'}}>Already had an Account?</h6>
                        <button onClick={redirectToLogin} style={{marginLeft:'60px'}}>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
