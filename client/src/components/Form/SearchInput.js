import React from "react";
import { useSearch } from "../../Context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [searchState, setSearchState] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data} = await axios.get(`/api/v1/product/search/${searchState.keyword}`);
        setSearchState({...searchState,results:data});
        navigate("/search"); 
    } catch (error) {
        console.log(error);
        
    }


  };
  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchState.keyword}
          onChange={(e) => setSearchState({ ...searchState, keyword: e.target.value })}
  
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
