import React from 'react'
// import { HiShoppingBag } from "react-icons/hi2";
import { NavLink,Link } from 'react-router-dom'
import { useAuth } from '../../Context/Auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput.js'
const Header = () => {
  const [Auth,setAuth] = useAuth();
  const handlelogout=()=>{
    setAuth({...Auth,
      user:null,
      token:""
    })
    localStorage.removeItem('Auth');
    toast.success('Logout Successfully')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand">
      🛒
      Brand Name
      </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to='/' className="nav-link"  >Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/category' className="nav-link"  >category</NavLink>
        </li>
        {
          !Auth.user?(<>
          <li className="nav-item">
          <NavLink to='/register' className="nav-link" >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link" >Login</NavLink>
        </li>
          </>):(<>
           <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {Auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${Auth?.user?.role === 1? 'admin':'user'}`} className="dropdown-item" href="#">Dashboard</NavLink></li>
    <li>

          <NavLink onClick={handlelogout} to='/login' className="dropdown-item" >Logout</NavLink>
    </li>
        
    
    
  </ul>
</li>

          </>)
        }
        <li className="nav-item">
          <NavLink to='/cart ' className="nav-link" >cart(0) </NavLink>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
