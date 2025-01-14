import { React, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";  // useNavigate is used to navigate to different pages
// useLocation is used to get the current location of the page after login
import { useAuth } from "../../Context/Auth";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const [Auth,setAuth] = useAuth();
//   form Handle Submit
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',{
                email:Email,
                password,
                
            }) 
            // console.log(res.data);
            if(res && res.data.success){
                toast.success("Login Successfully");
                setAuth({...Auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('Auth',JSON.stringify(res.data))
                navigate(location.state|| '/')
            }
            else{
                toast.error(res.data.msg)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <Layout title={"Login Ecommerce"}>
      <div className="form-container">  
        <h1>Login Page</h1>
        <form onSubmit={HandleSubmit} className="form">
          
          <div className="mb-3">
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Email"
              required

/>
          </div>
          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required

            />
          </div>
          <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={()=>navigate('/forgot-password')}>
            Forgot Password
          </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
