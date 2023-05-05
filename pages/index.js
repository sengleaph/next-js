import { Inter } from 'next/font/google'
import Layout from '.././pages/conponent/layout'
import DataTable , { createTheme } from 'react-data-table-component';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [product, setProduct] = useState([])
  const [search , setSearch] = useState(" ");
  const [filterProducts ,setProductFilter] = useState([]);
  const getProducts = async () => {
         const response = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
        setProduct(response.data)
        setProductFilter(response.data)
        console.log(product)
  }
  const table= [
    {
        name: "Product Name",
        selector: row => row.title,
    },
    {
        name: "Price",
        selector: row => row.price,
    },
    {
      name: "Category",
      selector: row => row.category.name,
  },
    {
        name: "Photo",
        selector: row => <img src={row.images} width={100} style={{'borderRadius':'20px','margin':'10px'}}/>
        ,
    },
    {
        name: "Action",
        cell: (flex) =>  <>
        <button className='btn btn-warning m-3'>Edit</button>
        <button className='btn btn-danger'>Delete</button>
        </>,
      },

]

  useEffect(() => {
      getProducts();
  },[])

  useEffect(() => {
      const result = product.filter(products => {
        return products.title.toLowerCase().match(search.toLowerCase());
      });
      setProductFilter(result);
  },[search])

  return (
      <Layout className='bg-white'>
        <header>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"/>
        </header>
        <main className='container bg-light '>
        <h1> Products Collection - Table</h1>
        <DataTable
        title='All Products Listing'
        columns={table}
        data={filterProducts}
        pagination
        fixedHeader
        subHeader
        fixedHeaderScrollHeight='900px'
        subHeaderComponent={
          <input type='text'
           placeholder='Search Here'
            className='form-control w-25'
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        }
        />
        <ToastContainer/>
        </main>
      </Layout>
  )
}

