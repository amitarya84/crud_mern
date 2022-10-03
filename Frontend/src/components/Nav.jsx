import React from 'react';
import classes from './Nav.module.css';
import { Button } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'


const Header = ({setOpenAddProduct}) => {
    function addProductClickHandler(){
        setOpenAddProduct(prv => !prv);
    }
    
    return (
        <nav className={classes.nav}>
            <h3>Product Management</h3>
            <ul>
                <li>
                    <Button primary onClick={addProductClickHandler}>Add Product</Button>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
