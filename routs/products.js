const express = require('express');
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const Products = require('../models/Products');
// const Post = require('../models/Users');

const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const products = await Products.find();

        res.send(JSON.stringify(products))

    } catch (error) {
        console.log(error)
    }
});

router.get('/:prodID', async (req, res) => {
    try {
        const product = await Products.findById(req.params.prodID);
        res.send(JSON.stringify(product))
    } catch (err) {
        res.json({ message: err })
    }
})

const multer = require('multer');
// const { update } = require('../models/Products');

const uploadedImages = [];

let upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
            let imageName = Date.now() + '-' + file.originalname;
            uploadedImages.push(imageName)
            return cb(null, imageName)
        },
    }),
})

router.post('/', upload.array('image'), async (req, res) => {
    // console.log('New req', req);
    console.log('New Product', req.body);
    const product = new Products({
        name: req.body.name,
        price: req.body.price,
        discription: req.body.discription,
        images: uploadedImages
    });

    try {
        const savedProduct = await product.save();
        console.log('Added to database..')
        uploadedImages.splice(0, uploadedImages.length)
        res.json(savedProduct)
    } catch (err) {
        console.log(err)
    }

})



router.delete('/:prodID', async (req, res) => {
    try {
        const removedPost = await Products.remove({ _id: req.params.prodID });

        res.send(JSON.stringify(removedPost))
    } catch (err) {
        res.json({ message: err })
    }
})


router.patch('/:prodID', upload.array('image'), async (req, res) => {
    console.log('req id', req.body)
    let _id = ObjectId(req.params.prodID)

    try {
        const updatedPost = await Products.updateOne(
            { _id: req.params.prodID },
            { $set: { 
                name: req.body.name, 
                price: req.body.price, 
                discription: req.body.discription, 
            }});

        console.log("updated", updatedPost)
        res.send(JSON.stringify(updatedPost))
        
    } catch (err) {
        res.json({ message: err })
    }
})





module.exports = router;