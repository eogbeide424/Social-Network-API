const { User} = require('../models');

module.exports = {
    
    
    // get all users
    getUsers (req, res) {
        User.find()
            .populate({path: 'thoughts', select: '-__v'}, {path: 'friends', select: '-__v'})
            .then((users)=> res.json(users))
            .catch((err)=> res.status(500).json(err));
    },
    
    
    // get one user by id

    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId})
            .populate({path: 'thoughts', select: '-__v'}, {path: 'friends', select: '-__v'})
            .select('__v')
            .then((user)=>
            !user
            ? res.status(404).json({message: 'No user found with this id'})
            : res.json(user)
            )
            .catch((err)=> res.status(400).json(err));

    },
    
    // create a user

    createUser (req, res){
        User.create(req.body)
            .then((user)=> res.json(user))
            .catch((err)=> res.status(400).json(err));
    },

};
