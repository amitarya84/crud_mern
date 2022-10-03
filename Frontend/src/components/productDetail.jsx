import React from 'react';
import { Modal, Image } from 'semantic-ui-react'

import classes from './productDetail.module.css'

const ProductDetail = ({ product, openProductDetail, setOpenProductDetail }) => {

    return (
        <Modal
            closeIcon
            size={'large'}
            open={openProductDetail}
            onClose={() => setOpenProductDetail(false)}
        >
            <Modal.Header>Product Detail</Modal.Header>
            <Modal.Content className={classes.imageContainer}>
                {
                    product.images.map(img => {
                        return <Image key={img} src={`${process.env.REACT_APP_IMAGE_API}/${img}`} size='small'/>
                    })
                }
            </Modal.Content>
            <Modal.Content>
                <h3 style={{marginBottom: '5px'}}>{product.name}</h3>
                <h5 style={{marginTop: '0px'}}>Price: {product.price} ₹</h5>
                <p>{product.discription}</p>
            </Modal.Content>
            {/* <Modal.Actions>
                <Button negative >
                    Cancel
                </Button>
                <Button positive >
                    Yes
                </Button>
            </Modal.Actions> */}
        </Modal>
    );
}

export default ProductDetail;
