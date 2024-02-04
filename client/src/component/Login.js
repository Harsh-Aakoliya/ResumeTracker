import axios from "axios";
import React, { useState } from "react";
import {Link} from "react-router-dom"
function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
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
                <Link to="/signup">Creat Account</Link>
            </form>
        </div>
    )
}
export default Login;