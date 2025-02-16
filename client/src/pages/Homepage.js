import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox,Radio } from 'antd'
import { Prices } from '../components/Prices.js'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); //categories
  const [selectedPrice,setselectedPrice]=useState([]); //prices
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);


  //Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something Went Wrong");

    }

  }
  //get all categories
  const getCategories = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
        
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories();
    getTotal();
  }, []);

//getTotal Count
const getTotal = async()=>{
  try {
    
    const { data } = await axios.get("/api/v1/product/product-count");
    if (data?.success) {
      setTotal(data.total);
    }
  } catch (error) {
    console.log(error);
  }
}
//Lifecycle method
useEffect(() => {
  if(page===1)return;
  loadMore();
}, [page]);
//loadmore products
const loadMore = async()=>{
  try {
    setLoading(true);
    const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    if (data?.success) {
      setProducts([...products,...data?.products]);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error("Something Went Wrong");
  }
}
  
  //filter products by category
  const handleFilter = async (value,id) => {
    let all = [...checked];
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter((c) => c !== id);
    }
    
    setChecked(all);
  }
  useEffect(() => {
    if(!checked.length || !selectedPrice.length)getAllProducts();

  }, [checked.length,selectedPrice.length]);
  useEffect(()=>{
    if(checked.length || selectedPrice.length)filterProduct();
  
  },[checked,selectedPrice]);
  //get Filtered Products
  const filterProduct  =async()=>{
    try {
      
      const { data } = await axios.post("/api/v1/product/product-filters",{checked,selectedPrice});
      if(data.success){
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (

    <Layout title={"All Products - Best Offer"}>
      <div className="row mt-3">
        <div className="col-md-2" >
          <h4 className='text-center'>Filter By Category</h4>
          <div className="d-flex flex-column">

            {/* Render categories here */
              categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)} >
                  {c.name}
                </Checkbox>
              ))
            }
          </div>
          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e)=>{setselectedPrice(e.target.value)}}>
              {/* Render prices here */
                Prices?.map((p) => (
                  <div key={p._id}>

                  <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))
              }
            </Radio.Group>
            
          </div>
          <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={()=>{window.location.reload()}} >RESET FILTER</button>
            
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap ">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} >
                <img className="card-img-top" src={p._id ? `/api/v1/product/product-photo/${p._id}` : "/placeholder-image.jpg"} alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">
                    $ {p.price}
                  </p>
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length <total &&(
              <button className='btn btn-warning' onClick={(e)=>{
                e.preventDefault();
                setPage(page+1);
              }}>
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>

    </Layout>

  )
}

export default Homepage
