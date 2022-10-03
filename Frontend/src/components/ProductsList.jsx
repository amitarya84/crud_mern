import React, { useState, useEffect } from 'react';

import Product from './Product';
import classes from './ProductsList.module.css'


const Products = ({ openAddProduct }) => {
    const [Products, setProducts] = useState([]);
    const [resfresh, setRefresh] = useState(false)

    useEffect(() => {
        // fetch(`http://localhost:5000/products`)
        fetch(`${process.env.REACT_APP_PRODUCT_API}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data)
            })
    }, [openAddProduct, resfresh]);

    return (
        <div className={classes.ProductContainer}>
            {(Products.length > 0) && Products.map(
                product => <Product
                    key={product._id}
                    product={product}
                    setRefresh={setRefresh}
                />

            )}
            {(!Products.length > 0) && <h1 style={{color: '#ccc', marginTop: '10%'}}>No Products to show! Add One!</h1>}
        </div>
    );
}

export default Products;
