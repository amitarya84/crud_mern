import React, { useState } from 'react';
import { Form, Button, Modal, Header, Input, TextArea } from 'semantic-ui-react'
import classes from './AddProduct.module.css'

const AddProduct = ({ openAddProduct, setOpenAddProduct }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discription, setDiscription] = useState('');
    const [images, setImages] = useState([]);

    function submitProduct() {
        let fd = new FormData();
        fd.append('name', name);
        fd.append('price', price);
        fd.append('discription', discription);

        console.log(images)
        Array.from(images).forEach(item => {
            fd.append('image', item)
        })

        // fetch('http://localhost:5000/products', {
        fetch(process.env.REACT_APP_PRODUCT_API, {
            method: 'POST',
            // headers: { 'Content-Type': 'multipart/form-data' },
            body: fd,
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setName('')
                setPrice('')
                setDiscription('')
                setImages([])
                setOpenAddProduct(false);
            })
        // alert(name + ' '+ price)
    }


    return (
        <Modal
            open={openAddProduct}
        >

            <Header>
                Add Product
            </Header>
            <Modal.Content className={classes.modelContent}>
                <Form>
                    <Input onChange={e => setName(e.target.value)} fluid focus placeholder='Product Name' /><br />
                    <Input onChange={e => setPrice(e.target.value)} fluid placeholder='Product Price' /><br />
                    <TextArea onChange={e => setDiscription(e.target.value)} placeholder="Product's description" /><br /><br />
                    <Input onChange={e => { console.log(images); setImages(e.target.files) }} type='file' placeholder='Product Name' multiple />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpenAddProduct(false)}>
                    Cancel
                </Button>
                <Button onClick={submitProduct} color='green'>
                    Upload
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default AddProduct;
