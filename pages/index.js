import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from './conponent/layout';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Home Page</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
        </Head>
          <h1 style={{color:"black"}}>Prodoct Collection - Table</h1>
        <div className="container mt-5">
            <h2 className='title-table' style={{color:"black"}}>All products listing</h2>
            <form class="px-4 py-3">
              <div class="mb-3">
                <input type="text" class="form-control" style={} placeholder="find product here" />
              </div>
            </form>
            <table className="table">
              <thead>
                <tr >
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Photos</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>{product.description}</td>
                        <td>
                          <img src={product.images} width={120} alt="" />
                        </td>
                        <td className="mx-auto p-2">
                          <button type="button" className="btn btn-primary mx-3">Edit</button>
                          <button type="button" className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
      </Layout>
    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const resp = await res.json();
  return {
    props: {
      products: resp
    },
  };
}
