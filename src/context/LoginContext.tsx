import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

//@ts-ignore
const CustomAuth = createContext();

export const useAuth = () => useContext(CustomAuth)

//@ts-ignore
export const CustomAuthProvider = ({ children }) => {

    const [firstLogin, setFirstLogin] = useState(true);

    const login = async (email:string, password:string) => {
        const data = {
            "email": email,
            "password": password
        }
        try {
            const response = await axios.post("https://localhost:7000/Login", data)
            localStorage.setItem('refresh', response.data.refreshToken);
            localStorage.setItem('access', response.data.accessToken)
            return response.data.accessToken
        }
        catch (error) {
            console.error(error);
        }
    }

    const getNewToken = async ()=>{
        try{
            if(!localStorage.getItem("refresh"))
            {
                return
            }
            const response = await axios.post('https://localhost:7000/Refresh', { "refresh": localStorage.getItem('refresh') });
            localStorage.setItem('refresh', response.data.refreshToken);
            localStorage.setItem('access', response.data.accessToken)
        }
        catch(error)
        {
            console.error(error)
        }

      }

      const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      };


        
    useEffect(() => {
        if (firstLogin) getNewToken();

        const interval = setInterval(() => {
        getNewToken();
        }, 180000);
        setFirstLogin(false);
        return () => {
        clearInterval(interval);
        };
    }, []);

    const value = {
        login: login,
        logout: logout
      };
    
      return <CustomAuth.Provider value={value}>{children}</CustomAuth.Provider>;

}