const express = require('express')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "bhanu@123"


const fetchUser = (req,res,next)=>{
    //get the user from the jwt token and add id to req object
    console.log(req)
    const token = req.header('auth-token')
    if (!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        console.log(data)
        //save token
        req.user = data.user
        next()
    } catch (err) {console.log(err)
        res.status(500).send('potential error occured')}
}

module.exports = fetchUser