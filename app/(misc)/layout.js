'use client'
import Footer from "@/components/landing/sections/footer";
import Navbar from "@/components/landing/sections/navbar";


export default function MiscLayout({ children }) {

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
            {children}
         
        
      <Footer/>
    </div>
  );
}
