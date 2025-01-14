import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import  { Toaster } from 'react-hot-toast';
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

      </Helmet>
      <Header />
      <main style={{ minHeight: "73.5vh" }} >
      <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  )
}
Layout.defaultProps = {
  title: 'Welcome to Ecommerce',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs',
  author: 'Shivpratap Singh'
}

export default Layout
