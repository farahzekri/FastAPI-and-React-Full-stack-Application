import { useState,createContext } from "react";

export const ProductContext =createContext();
const ProductProvider = ({ children }) => {
    const [products,setproduct]=useState({ data: [] });
    return (
    <>
      <ProductContext.Provider value={ [products,setproduct]}>
        {children}
      </ProductContext.Provider>

    </>  
    );
}
 
export default ProductProvider;