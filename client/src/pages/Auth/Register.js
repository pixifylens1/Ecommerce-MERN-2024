import { React, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Answer, setAnswer] = useState("");
  const navigate = useNavigate();
//   form Handle Submit
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',{
                name,
                email:Email,
                password,
                phone:Phone,
                address:Address,
                answer:Answer
            }) 

            if(res && res.data.success){
                toast.success(res.data.msg)
                navigate('/login')
            }
            else{
                toast.error(res.data.msg)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.messge)
        }
    }
  return (
    <Layout title={"Register Ecommerce"}>
      <div className="form-container">  
        <h1>Register Page</h1>
        <form onSubmit={HandleSubmit} className="form">
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Name"
              required
            />
          </div>
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
            <input
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Phone"
              required

            />
          </div>
          <div className="mb-3">
            <input
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Address"
              required

            />
          </div>
          <div className="mb-3">
            <input
              value={Answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="What is Your Best Friend Name?"
              required

            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
