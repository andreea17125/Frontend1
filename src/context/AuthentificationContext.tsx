import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

//@ts-ignore
const CustomAuth = createContext();

export const useAuth = () => useContext(CustomAuth);

//@ts-ignore
export const CustomAuthProvider = ({children})=>{

    const [firstLogin,setFirstLogin]=useState(true)

    const login = async (email:string,password:string)=>{
        const data ={
            "email":email,
            "password":password
        }
        const response = await axios.post("https://localhost:7000/Login",data)
       const accessToken =  response.data.accessToken 
       const refreshToken = response.data.refreshToken 
       const {unique_name , role} = jwtDecode(accessToken) as any
       localStorage.setItem("accessToken",accessToken)
       localStorage.setItem("refreshToken",refreshToken)
       localStorage.setItem("user",JSON.stringify({"email":unique_name,"role":role}))
    }

    const getNewToken = async ()=>{
      try{
        const refresh = localStorage.getItem("refreshToken")
        if(!refresh)
        {
            return
        }
        const response = await axios.post("https://localhost:7000/Refresh",{refreshToken:refresh}) as any
        const accessToken =  response.data.accessToken 
        const refreshToken = response.data.refreshToken 
        const {unique_name , role} = jwtDecode(accessToken) as any
        localStorage.setItem("accessToken",accessToken)
        localStorage.setItem("refreshToken",refreshToken)
        localStorage.setItem("user",JSON.stringify({"email":unique_name,"role":role}))
      }
      catch(e)
      {
        //localStorage.removeItem("accessToken")
        //localStorage.removeItem("refreshToken")
        //localStorage.removeItem("user")
      }
    }

    useEffect(()=>{
        if(firstLogin) getNewToken()
        const interval = setInterval(()=>{
            getNewToken()
        },3*60*1000)
        setFirstLogin(false)
        return () => {
            clearInterval(interval);
          };
    },[])

    const value = {
       login:login 
      };

      return <CustomAuth.Provider value={value}>{children}</CustomAuth.Provider>;

}

/*

name:""
email:""
blabla:""
role:""
*/