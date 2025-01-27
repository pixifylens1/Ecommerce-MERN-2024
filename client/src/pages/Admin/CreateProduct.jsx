import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  //Get all categories
  const getCategories = async (req,res) => {
    try {
      const {data} = await axios.get("/api/v1/category/get-category");
      if(data?.success){
        setCategories(data?.category);

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
  const handleCreate=async(e)=>{
      e.preventDefault();
    try {
      const productdata = new FormData();
      productdata.append("name",name);
      productdata.append("photo",photo);
      productdata.append("description",description);
      productdata.append("price",price);
      productdata.append("quantity",quantity);
      productdata.append("shipping",shipping);
      productdata.append("category",category);

      const {data} = await axios.post("/api/v1/product/create-product",productdata);
      if(data?.success){
        toast.success(`${name} is created`);
        navigate("/dashboard/admin/products");
      }
      else{
        toast.error(data?.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in create product");
      
    }

  }
  return (
    <Layout title={"Dashboard-Create Product"}>
                <div className="container-fluid m-3 p-3">

      <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>Create Product</h1>
                <div className="m-1 w-75">
                 
                  <Select variant={false} size='large' showSearch
                  className='form-control mb-3'
                  onChange={(value)=>setCategory(value)}
                  style={{width:"100%"}} placeholder="Select Category"> 
                  {categories.map(cat=>(
                    <Option key={cat._id} value={cat._id}>
                      {cat.name}
                    </Option>
                  ))}

                  </Select>
                  <div className="mb-3">
                    <label  className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name: "Upload Image"}
                      <input type="file" name="" accept='image/*' onChange={(e)=>{setPhoto(e.target.files[0])}} hidden />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo &&(
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt="Product photo" height={"200px"} className='img img-responsive'/>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input type="text" value={name} placeholder='Enter Product name' className='form-control'
                    onChange={(e)=>{setName(e.target.value)}} />
                  </div>
                  <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className=" mb-3"><button className='btn btn-primary' onClick={handleCreate}>Create Product</button></div>
                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct
