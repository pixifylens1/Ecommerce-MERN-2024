import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../Context/Search";
const SearchPage = () => {
  const [searchState, setSearchState] = useSearch();
  return (
    <Layout title="Search Results">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h4>
            {searchState.results.length < 1
              ? "No product Fount"
              : `Found ${searchState?.results.length}`}
          </h4>
          <div className="d-flex flex-wrap mt-4 ">
            {searchState?.results.map((p) => (
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
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
