import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Header, Input, TextArea } from 'semantic-ui-react'
import classes from './AddProduct.module.css'

const EditProduct = ({ _id, openEditProduct, setOpenEditProduct, setRefresh }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discription, setDiscription] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_PRODUCT_API}/${_id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setName(data.name)
            setPrice(data.price)
            setDiscription(data.discription)
        })
    }, [_id, openEditProduct]);

    function submitUpdatedProduct() {
        let fd = new FormData();
        fd.append('name', name);
        fd.append('price', price);
        fd.append('discription', discription);

        console.log(images)
        Array.from(images).forEach(item => {
            fd.append('image', item)
        })
        console.log('fd', fd, name, price, discription, _id)

        fetch(`${process.env.REACT_APP_PRODUCT_API}/${_id}`, {
            method: 'PATCH',
            body: fd,
        }).then(res => res.json())
            .then(data => {
                console.log('patch res', data)
                setName('')
                setPrice('')
                setDiscription('')
                setImages([])
                setRefresh(prv => !prv)
                setOpenEditProduct(false);
            })
        // alert(name + ' '+ price)
    }


    return (
        <Modal
            open={openEditProduct}
        >

            <Header>
                Edit Product
            </Header>
            <Modal.Content className={classes.modelContent}>
                <Form>
                    <Input value={name} onChange={e => setName(e.target.value)} fluid focus placeholder='Product Name' /><br />
                    <Input value={price} onChange={e => setPrice(e.target.value)} fluid placeholder='Product Price' /><br />
                    <TextArea value={discription} onChange={e => setDiscription(e.target.value)} placeholder="Product's description" /><br /><br />
                    <Input onChange={e => { console.log(images); setImages(e.target.files) }} type='file' placeholder='Product Name' multiple />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpenEditProduct(false)}>
                    Cancel
                </Button>
                <Button onClick={submitUpdatedProduct} color='green'>
                    Upload
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default EditProduct;
