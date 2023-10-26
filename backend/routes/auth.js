const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = "bhanu@123"

// Route 1 -->create user/signup endpoint

router.post('/createuser', [
    body('name', 'name should contains atleast 3 characters').isLength({ min: 3 }),
    body('email', 'email should be a valid one').isEmail(),
    body('password', 'password must contains atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() })
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success,errors: 'email already exists' })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            console.log("data added successfully");
            const data = {
                user: {
                    id: user.id
                }

            }

            // Create token
            
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true
            // res.json({ authtoken: authtoken, user: user })
            res.json({success, authtoken: authtoken })

        } catch (err) {
            console.log(err)
            res.status(500).send('Internal server error occured')
        }
    })

router.get('/', (req, res) => {
    res.send('hello welcome to authentication page');
})

// Route 2 -->login endpoint 

router.post('/login', [
    body('email', 'email should be a valid one').isEmail(),
    body('password', 'password must contains atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
        }
        const { email, password } = req.body

        try {
            let user = await User.findOne({ email: email })
            console.log(user)
            if (!user) {
                success = false;
                return res.status(400).json({ error: 'wrong username' });
            }
            const passwordcompare = await bcrypt.compare(password, user.password)
            if (!passwordcompare) {
                success = false;
                return res.status(400).json({ success, error: 'wrong password' });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log("hii")
            success = true;
            res.json({ success,authtoken: authtoken})
            // res.json({ success,authtoken: authtoken, user: user })

        }
        catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error occurred' });

        }
    })


// Route 3 -->get loggedin user details using: post "/api/autj/getuser". login required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Internal server error occured')
    }
})

module.exports = router