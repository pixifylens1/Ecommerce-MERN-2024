import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout.js'
import { useAuth } from '../Context/Auth.js'
import axios from 'axios'
import toast from 'react-hot-toast'
const Homepage = () => {
  const [ Auth,setAuth ] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  //Get all products
  // const getAllProducts = async(req,res)=>{
  //   try {
  //     const {data} = await axios.get("/api/v1/product/get-products");
  //     if(data?.success){
  //       setProducts(data?.products);
  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something Went Wrong");
      
  //   }

  // }
  // useEffect(()=>{
  //   getAllProducts();
  // },[]);
  return (
    
      <Layout title={"All Products - Best Offer"}>
      <div className="row mt-3">
  <div className="col-md-3" >
    <h4 className='text-center'>Filter By Category</h4>
  </div>
 
  <div className="col-md-9">
    <h1 className="text-center">All Products</h1>
    <div className="d-flex flex-wrap ">
      <h1>Products</h1>
    </div>
  </div>
</div>

      </Layout>
    
  )
}

export default Homepage
