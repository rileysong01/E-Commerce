// import CategoryMenu from "../components/CategoryMenu";
import ProductItem from "../components/ProductItem";
import ProductFilter from "../components/ProductFilter";

import { useStoreContext } from "../utils/GlobalState";
import spinner from '../assets/spinner.gif'
import { useQuery } from '@apollo/client';
import { QUERY_SALES } from '../utils/queries';

import { useState, useEffect } from 'react';

const Sales = () => {

    const [state, dispatch] = useStoreContext();

    const { currentCategory, priceSortOrder } = state;
    const { loading, data } = useQuery(QUERY_SALES, {
      variables: { categoryID: currentCategory || null, priceSortOrder: priceSortOrder || null },
    });

    const products = data?.getSales || []
    return (
        <div className="sale-page">
            <ProductFilter/>
            
            <div className="flex-row product-list ">
 
                 {products.map((product) => {
                     return ( <ProductItem  key={product._id}
                        _id={product._id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                         />)
                    
                })} 
                {loading ? <img src={spinner} alt="loading" /> : null}
                
                
            </div>
        </div>
    )

}

export default Sales;