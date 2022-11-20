
const express = require('express');
const router = express.Router();      //router is iported to specify different routes
const User = require("../models/User")
const { body, validationResult } = require('express-validator');   //to validate the input matches criteria or not 
const bcrypt = require('bcryptjs');   //bcrypt is used for authenticatin management and hashing etc
const jwt = require('jsonwebtoken');   //jwt is a token given to a logged in user to verify 
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = 'mynameisnitishakaincredible';


//create  a user using : POST "/api/auth/createuser".Doesn't require auth

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),        //set express validators criteria for every input 
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters long').isLength({ min: 5 }),
],
    async (req, res) => {
      let success=false;
        const errors = validationResult(req);                    //using validators to check and return if there is invalid email or password or name given by  the user 
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success,error: "Sorry an user already registered with this email" })
            }
            const salt = await bcrypt.genSalt(10);     //hash is like some string that is added after the password and then the hash is calculated , ie: it increases the security 
            const secPass = await bcrypt.hash(req.body.password, salt);      //hashed password that we are going to store in the database 

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {     //data that we want to pass in  jwt token , ie: here we want user id 
                user: {
                    id: user.id
                }
            }

            // JWT or JSON Web Token is a string that is sent in the HTTP request (from client to server) to validate the authenticity of the client. But now, you don’t have to save JWT in the database. Instead, you save it on the client-side only.
            //jwt token has 3 parts separated by dots first is algo used for jwt 2) data we want to pass 3) signature that  is secret



            const authToken = jwt.sign(data, JWT_SECRET); //jwt secret is like a key to verify if a user is 
            success=true;   
            res.json({ success,authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }

        // .then(user=>res.json(user)).catch(error=>{               we are not using this  as we want to show different types of error for different problems occuredd in the code
        //     console.log(error) ;
        //     res.json({error:"please enter a unique value for email",message:error.message});
        //  })
    })


// login a user using : POST "/api/auth/loginuser".Doesn't require auth

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);                    //using validators to check and return if there is invalid email or password or name given by  the user 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ success, error: "please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal sever error");
        }





    })


//Router 3:  Get logged in user details ,POST "/api/auth/getuser" ,login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        let userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error");
    }
})


module.exports = router;