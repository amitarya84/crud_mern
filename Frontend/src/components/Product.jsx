import React, { useState } from 'react';
import { Card, Image, Button, Dropdown } from 'semantic-ui-react'
import EditProduct from './EditProduct';
import classes from './Product.module.css'
import ProductDetail from './productDetail';

const Product = ({ product, setRefresh }) => {
    const [options, setOptions] = useState(false);
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [openEditProduct, setOpenEditProduct] = useState(false);

    function productEdit() {
        setOpenEditProduct(true)
        setOptions(false)
    }
    function productDelete() {
        let sure = window.confirm('Are you sure you want to delete this product?')

        if (sure) {
            fetch(`${process.env.REACT_APP_PRODUCT_API}/${product._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setRefresh(prv => !prv)
                    setOptions(false)
                })
        }
    }
    function viewProduct() {
        setOpenProductDetail(true)
    }
    return (
        <>
            <Card className={classes.card}>
                <div className={classes.imageContainer}>
                    {/* <Image src={`http://localhost:5000/images/${image}`} wrapped ui={false} /> */}
                    <Image src={`${process.env.REACT_APP_IMAGE_API}/${product.images[0]}`} wrapped ui={false} />
                </div>
                <Card.Content>
                    <div className={classes.rowDiv}>
                        <div>
                            <Card.Header>{product.name}</Card.Header>
                            <Card.Meta>
                                <span className={classes.price}>Rs. {product.price} ₹</span>
                            </Card.Meta>
                            <Card.Description>
                                {product.discription}
                            </Card.Description>
                        </div>
                        <div>
                            <Dropdown text=''>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={productEdit} text='Edit' />
                                    <Dropdown.Item onClick={productDelete} text='Delete'/>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* <Icon className={classes.cardOptionsIcon} onClick={() => setOptions(prv => !prv)} name='dropdown' />
                            {options && <ul className={classes.cardOptions} >
                                <li onClick={productEdit}>Edit</li>
                                <li onClick={productDelete}>Delete</li>
                            </ul>} */}
                        </div>
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={viewProduct} style={{ width: '100%' }} primary>View Product</Button>
                </Card.Content>
            </Card>
            <EditProduct _id={product._id} openEditProduct={openEditProduct} setOpenEditProduct={setOpenEditProduct} setRefresh={setRefresh} />
            <ProductDetail product={product} openProductDetail={openProductDetail} setOpenProductDetail={setOpenProductDetail} />
        </>

    );
}

export default Product;
