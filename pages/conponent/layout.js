import Head from "next/head"
import Footer from "./footer"
import Navbar from "./navbar"


const Layout  = ({children})=>{
    return (
        <>
        
        <Navbar/>
        <main className="bg-light">{children}</main>
        <Footer/>
        </>
    )
}
export default Layout;