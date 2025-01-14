import {useState,useEffect,useContext,createContext} from 'react';
import axios from 'axios';
const AuthContext=createContext();
const AuthProvider=({children})=>{
    const [Auth,setAuth]=useState({
        user:null,
        token:"",
    });

    //Default axios
    axios.defaults.headers.common['Authorization'] = Auth?.token;
useEffect(()=>{       //used for local storage to store data
    const Data = localStorage.getItem('Auth');
    if(Data){
        const parseData = JSON.parse(Data);
        setAuth({
            user:parseData.user,
            token:parseData.token
        })
    }
},[]);
useEffect(() => {
    localStorage.setItem("Auth", JSON.stringify(Auth));
  }, [Auth]);
return(
<AuthContext.Provider value={[Auth,setAuth]}>

    {children}
</AuthContext.Provider>

)


}
//custom hook
const useAuth=()=>useContext(AuthContext);

export {AuthProvider,useAuth}
 