import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { get, set } from 'mongoose';
import { Button, Modal } from 'antd';


const CreateCetogory = () => {
  const [Categories, setCategories] = useState([]);
  const [name, setname] = useState("");
  const [isvisible, setisvisible] = useState(false); //for modal
  const [selected, setselected] = useState(null); //for modal edit form 
  const [editname, seteditname] = useState(""); //for modal edit form
  //Handle Form
const handlesubmit = async(e)=>{
  e.preventDefault();
  try {

    const {data} = await axios.post("/api/v1/category/create-category",{name});
    if(data?.success){
      toast.success(`${name} is created`);
      getCategories();
      
    }else{
      toast.error(data.message);
    }
    
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong in input form");
    
  }

}

  //get all categories
  const getCategories = async (req,res) => {
    try {
      const {data} = await axios.get("/api/v1/category/get-category");
      if(data.success){
        setCategories(data.category);

      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      res.status(500).send({
        success:false,
        error,
        message:"Error In Getting Category"})
    }
  }
  useEffect(()=>{
    getCategories();
  },[]); 

  // update category
  const handleupdate = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:editname}); 
      if(data.success){
        toast.success(`${editname} is updated`);
        setselected(null);
        seteditname("");
        setisvisible(false);
        getCategories();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in input form");
    }

  }
  // delete category
  const handledelete = async(pid)=>{
    
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pid}`); 
      if(data.success){
        toast.success(`Category is deleted`);
        // setselected(null);
        // seteditname("");
        // setisvisible(false);
        getCategories();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in input form");
    }

  }
  return (
    <Layout title={"Dashboard-Create Category"}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>Manage Catogory</h1>
                <div className="p-3 w-50">
                 <CategoryForm handleSubmit={handlesubmit} value={name} setvalue={setname}/> 
                </div>
                <div className='w-75'>
       <table className="table">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
      {Categories?.map((c)=>(<>
    <tr>
      
        <td key={c._id} > {c.name} </td>
        
        < td><button className='btn btn-primary ms-2' onClick={()=>{setisvisible(true);seteditname(c.name);
          setselected(c);
        }}>Edit</button>
        <button className='btn btn-danger ms-2' onClick={()=>{handledelete(c._id)}}>Delete</button></td>
        
    </tr>
      </>
      ))}
  </tbody>
</table>

                </div>
                <Modal onCancel={()=>setisvisible(false)} footer={null} open={isvisible}>
                  <CategoryForm value={editname} setvalue={seteditname} handleSubmit={handleupdate}/>
                </Modal>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCetogory
