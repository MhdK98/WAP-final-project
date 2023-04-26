const express = require('express');
const Product = require("../models/Product");
const User = require("../models/User");


const router = express.Router();

router.get('/', (req, res, next) => {
    const token = req.get("Authorization");
    console.log({token})
    if (User.isRequestValid(token)) {
        res.status(200).json(Product.getAll());
    } else {
        res.status(401).json("{'response':'invalid credentials'}");
    }
});

router.get('/:ProductId', (req, res, next) => {
    const token = req.get("Authorization");
    if (User.isRequestValid(token)) {
        res.json(Product.findById(req.params.ProductId));
    } else {
        res.status(401).json("{'response':'invalid credentials'}");
    }
});


router.post('/', (req, res, next) => {
    const token = req.get("Authorization");
    if (User.isRequestValid(token)) {
        const addedProduct = new Product(req.body.title
            , req.body.description, req.body.price, req.body.quantity).save();
        res.status(201).json(addedProduct);
    } else {
        res.status(401).json("{'response':'invalid credentials'}");
    }
});

router.post('/makeOrder', (req, res, next) => {
    const token = req.get("Authorization");
    if (User.isRequestValid(token)) {
        if (Product.makeOrder(req.body)) {
            res.status(200).json("{'response':'order placed successfully.'}");
        } else {
            res.status(400).json("{'response':'items or quantity ordered are not available'}");
        }
    } else {
        res.status(401).json("{'response':'invalid credentials'}");
    }
});


router.delete('/:ProductId', (req, res, next) => {
    const token = req.get("Authorization");
    if (User.isRequestValid(token)) {
        res.json(Product.deleteById(req.params.ProductId));
    } else {
        res.status(401).json("{'response':'invalid credentials'}");
    }
});

router.put('/:ProductId', (req, res, next) => {
    const token = req.get("Authorization");
    if (User.isRequestValid(token)) {
        const editedProduct = new Product(req.params.ProductId, req.body.title
            , req.body.description, req.body.price, req.body.quantity).edit();
        res.json(editedProduct);
    } else {
        res.status(401).json("{'response':'invalid credentials'}");
    }
});


module.exports = router;