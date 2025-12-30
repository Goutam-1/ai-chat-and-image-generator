import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import "./style.css"

export default function  ProtectRoute({children}) {
             console.log("gg");

    const [Auth,SetAuth]=useState(null);
    const [loading,setLoading]=useState(true)
       
useEffect(()=>{
                        
              const check = async ()=>{
          try{ const res= await axios.get("http://localhost:8080/verify",{withCredentials:true })
             if(res.status===200){
                 SetAuth(true)
             }
            }
            catch(err){
               SetAuth(false)
               
            } finally {
                setLoading(false)
            }
        }

     check()

    },[])
    
          if(loading) return <div className='load'></div>
          return  (Auth) ? children : <Navigate to="/" replace  />;
}
