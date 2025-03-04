import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const ResetPassword = () => {

    const [valid,setValid] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(true)
    const {pk} = useParams()
    const handleUniqueResetCodeCheck = async()=>{
        axios.get(`https://localhost:7000/ValidateUniqueResetPasswordCode/${pk}`).then(e=>{
            if(e.data.statusCode === 200)
            {
                setValid(true)
            }
            else
            {
                setValid(false)
            }
            setLoading(false)
        })
    }
    useEffect(()=>{
        handleUniqueResetCodeCheck()
    },[pk])
    
    const handleReset = async ()=>{

    } 
    const alignCenter = {
        display:'flex',alignItems:'center',justifyContent:'center',
    }
    if(loading)
    {
        return (
            <>LOADING</>
        )
    }
    if(!valid)
    {
        return (
            <p>N-AI VOIE!</p>
        )
    }

    return (
        <div style={{...alignCenter,width:'100vw',height:'100vh'}}>
            <form style={{...alignCenter,flexDirection:"column"}} onSubmit={handleReset}>
                <label>Password</label>
                <input placeholder="new password..." type="password" />
                <label>Repeat password</label>
                <input placeholder="repeat new password..." type="password" />
            </form>
        </div>

    )

}
export default ResetPassword