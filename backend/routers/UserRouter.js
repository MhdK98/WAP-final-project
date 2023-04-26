const express = require('express');
const User = require("../models/User");


const router = express.Router();


router.post('/login', (req, res, next) => {
    //console.log({req});
    const response = User.login(req.body.username, req.body.password);
    if(response != false){
        res.status(200).json(response);
    }else{
        res.status(400).json("{'response':'wrong credentials'}");
    }
});

router.post('/logout', (req, res, next) => {
    const token = req.get("Authorization");
    if(User.isRequestValid(token)){
        const response = User.logout(req.body.username);
        if(response == true){
            res.status(200).json({'response':'logout successfully'});
        }else{
            res.status(400).json("{'response':'User not found'}");
        }
    }else{
        res.status(401).json("{'response':'invalid credentials'}");
    }
});


module.exports = router;