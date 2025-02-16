import Layout from '../components/Layout/Layout'
import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { set } from 'mongoose'
const Productdetails = () => {
    const [products, setProducts] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const params = useParams();
    //Initial Product Details
    useEffect(()=>{
        if(params?.slug){
            getProducts();
        }
    },[params?.slug])
    //get Products

    const getProducts = async()=>{
        try {
            const {data} = await axios.get(`/api/v1/product/get-products/${params.slug}`);
            setProducts(data?.product);
            
            if(data?.product) {
                getRelatedProducts(data.product._id, data.product.category._id);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    //Related Products
    const getRelatedProducts = async(pid,cid)=>{
        try {
            const {data} = await axios.get(`/api/v1/product/similar-products/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(products._id){
            getRelatedProducts();
        }
    },[products])
  return (
    <Layout>
      <h1> Productdetails</h1>
        
            <div className="row container mt-2">
            <div className="col-md-6">
                <img
                src={products._id ? `/api/v1/product/product-photo/${products._id}` : "/placeholder-image.jpg"}
                alt={products.name}
                className="img-fluid"
                height={400}
                width={400}
                />
            </div>
            <div className="col-md-6 text-center">
                <h1>{products.name}</h1>
                <p>{products.description}</p>
                <p>${products.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
            </div>

            </div>
            <hr/>
            <div className="row container "><h6>Similar Products</h6>
            {relatedProducts.length < 1 && <p className='text-center'>No Similar Products Found</p>}
            <div className="d-flex flex-wrap ">
            {relatedProducts?.map((p) => (
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
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
            </div>
    </Layout>
  )
}

export default Productdetails
