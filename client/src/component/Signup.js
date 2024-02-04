import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
function Signup(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/signup",{name,email,password})
        .then(res=>console.log(res))
        .catch(e=>console.log(e));
    }
    return(
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">User Name</label>
                    <input type="text" placeholder="Enter username" onChange={(e)=>{setName(e.target.value)}}></input>
                    <p>{name}</p>
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}></input>
                    <p>{email}</p>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <p>{password}</p>
                </div>
                <button type="submit"> Submit </button> <br />
                <Link to="/login">Already have an Account</Link>
            </form>
        </div>
    )
}
export default Signup;