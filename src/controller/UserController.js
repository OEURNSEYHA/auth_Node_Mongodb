
const { default: isEmail } = require('validator/lib/isemail');
const Users = require('../model/Users');

const UserController = {

    get: async(req, res)=>{
        res.json({message: "Hello"})
    },

    register: async(req, res)=>{
        try{
            const {name, email, password } = req.body;
            if(!name || !email|| !password){
                throw Error("Please Input Failed")
            }
            if(!isEmail(email)){
                throw Error("Email Invalid")
            }
            if(!isStrongPassword(password)){
                throw Error("Password Not Strong")
            }
            const user = await Users.create({name,email, password});
            res.json(user);
        }catch(err){
            res.json({error: err.message});
        
        }
      
    }

}

module.exports = UserController;