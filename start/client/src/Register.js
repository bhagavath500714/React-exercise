import React, { useState } from 'react';
import Axios from 'axios';
import { userRegisteration } from './services';


const Register = () => {
    const [ registerData, setRegisterData ] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        password: "",
        number: ""
    })

    const displayInfo = () =>{
        userRegisteration(registerData).then((res)=>{
        console.log('res---',res);
        if(res.data.success === 1) {
            console.log('registered successfully');
        }
      })
    }

    return (
        <div>
      <div>
        <label>First Name</label>
        <input type="text" onChange={(event) => {setRegisterData({...registerData, first_name : event.target.value})}} />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" onChange={(event) => {setRegisterData({...registerData, last_name : event.target.value})}} />
      </div>
      <div>
        <label>Gender</label>
        <input type="text" onChange={(event) => {setRegisterData({...registerData, gender : event.target.value})}}/>
      </div>
      <div>
        <label>Email</label>
        <input type="text" onChange={(event) => {setRegisterData({...registerData, email : event.target.value})}} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={(event) => {setRegisterData({...registerData, password : event.target.value})}} />
      </div>
      <div>
        <label>number</label>
        <input type="text" onChange={(event) => {setRegisterData({...registerData, number : event.target.value})}} />
      </div>
      <button onClick={() => displayInfo()}>Add Info</button>
    </div>
    )
}

export default Register;
