import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { useAuth } from '../Context/Auth.js'
const Homepage = () => {
  const [ Auth,setAuth ] = useAuth();
  return (
    
      <Layout><h1>Homepage</h1>
      <pre>{JSON.stringify(Auth,null,2)}</pre>
      </Layout>
    
  )
}

export default Homepage
