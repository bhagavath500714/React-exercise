import React, { useState } from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import ErrorMsg from './ErrorMsg';
import { userLogin } from './services';

const Login = () => {
    const initialValues = {
        email:  '',
        password:  ''
      };
      const [showErrorMsg, setShowErrorMsg] = useState(false)
      const [ loginData, setLoginData ] = useState({
        email: "",
        password: ""
    })
    
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Please enter the valid Email'),
      password: Yup.string().required('Please enter the valid password'),
    });
    
    function onSubmit  (values, {setErrors, resetForm, setSubmitting}) {
      setShowErrorMsg(false)
      userLogin(loginData).then((res)=>{
        console.log('res---',res);
        if(res.data.success === 1) {
          window.sessionStorage.setItem("token", res.data.token);
          window.sessionStorage.setItem("email", loginData.email);
        }
      })
    }
    
    const formik = useFormik({initialValues, onSubmit, validationSchema});
      const {setFieldValue, values} = formik;
    
    function changeLogin(value){
      setFieldValue('email',value)
      setLoginData({...loginData, email:value})
    }
    
    function changePassword(value){
      setFieldValue('password',value)
      setLoginData({...loginData, password:value})
    }

    return (
        <div>
      <div>
        <label>Email</label>
        <input required type="text" onFocus={()=>setShowErrorMsg(false)}  onBlur={()=>setShowErrorMsg(false)} value={values.email} onChange={(e)=> changeLogin(e.target.value)} />
        <ErrorMsg formik={formik} field="email" />
      </div>
      <div>
        <label>password</label>
        <input required type="text" onFocus={()=>setShowErrorMsg(false)}  onBlur={()=>setShowErrorMsg(false)} value={values.password} onChange={(e)=>changePassword(e.target.value)}/>
        <ErrorMsg formik={formik} field="password"/>
      </div>
      
      <button onClick={formik.submitForm}>Login</button>
    </div>
    )
}

export default Login;