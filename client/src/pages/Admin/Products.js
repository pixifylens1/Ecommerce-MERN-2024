import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.js";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  //Get all products
  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong getting product");
    }
  };
  //Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard-Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Products List</h1>
            <div className="d-flex flex-wrap">

            {products?.map((p)=> (
                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-style">
                <div className="card m-2" style={{ width: "18rem" }} >
                <img className="card-img-top" src={p._id ? `/api/v1/product/product-photo/${p._id}` : "/placeholder-image.jpg"} alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description}
                  </p>
                  
                </div>
              </div>
                </Link>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
