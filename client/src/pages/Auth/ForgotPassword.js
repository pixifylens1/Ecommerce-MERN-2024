import { React, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate} from "react-router-dom";  // useNavigate is used to navigate to different pages


const ForgotPassword = () => {
    const [Email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setanswer] = useState("");
  
  const navigate = useNavigate();
 
  
//   form Handle Submit
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',{
                email:Email,
                newPassword,
                answer
                
            }) 
            console.log(res.data);
            if(res && res.data.success){
                toast.success("Reset Successfully");
                
                navigate('/login')
            }
            else{
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    
    }
  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container">  
        <h1>Reset Password</h1>
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
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required

            />
          </div>
          <div className="mb-3">
            <input
              value={answer}
              onChange={(e) => setanswer(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Best Friend Name"
              required

            />
          </div>
          

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
