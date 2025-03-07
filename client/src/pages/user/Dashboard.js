import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import UserMenu from '../../components/Layout/UserMenu.js'
import { useAuth } from '../../Context/Auth.js'
const Dashboard = () => {
  const [Auth] = useAuth();
  return (
    <Layout title={'Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
            <h3>Welcome {Auth?.user?.name}</h3>
            <h3>Your email: {Auth?.user?.email}</h3>
            <h3>Your Address: {Auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
