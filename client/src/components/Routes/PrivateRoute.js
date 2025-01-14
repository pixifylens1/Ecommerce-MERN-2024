import { useState,useEffect } from "react";
import { useAuth } from "../../Context/Auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";
export default function PrivateRoute(){
    const [ok,setOk]=useState(false);
    const [Auth,setAuth]=useAuth();

    useEffect(()=>{
        const Authcheck = async()=>{
            const res = await axios.get('/api/v1/auth/user-auth')
            if(res.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }

        }
        if(Auth?.token){
            Authcheck();
        }


    },[Auth?.token]);

    return ok?<Outlet/>:<Spinner/>

}