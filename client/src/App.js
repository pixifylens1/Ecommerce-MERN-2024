import { Routes,Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCetogory from './pages/Admin/CreateCetogory';
import CreateProduct from './pages/Admin/CreateProduct';
import User from './pages/Admin/User';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js';

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/dashboard' element={<PrivateRoute />} >


        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Order />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />} >


        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCetogory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<User />} />
        </Route>
      
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/Policy" element={<Policy />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<PageNotFound/>} />
        
      </Routes>
    
    </>
  );
}

export default App;
