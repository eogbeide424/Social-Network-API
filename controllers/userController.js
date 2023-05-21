const { User, Thought} = require('../models');


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


    // update a user by id


    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user)=>
        !user
         ? res.status(404).json({message: 'No user found with this id'})
           : res.json(user))
              .catch((err)=> res.status(400).json(err));
    }, 
    // create a user

    createUser (req, res){
        User.create(req.body)
            .then((user)=> res.json(user))
            .catch((err)=> res.status(400).json(err));
    

    },

    // delete a user by id

    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
            .then((user)=>
            !user
            ? res.status(404).json({message: 'No user found with this id'})
           : Thought.deleteMany({_id: {$in: user.thoughts}})
            )
            .then(()=> res.json({message: 'User and associated thoughts deleted'}))
            .catch((err)=> res.status(400).json(err));
    },

    addFriend(req, res){
        User.findOneAndUpdate(
            {id_: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {runValidators: true, new: true},
        )
        .then((user)=>
            !user
            ? res
            .status(404)
            .json({message: 'Something went wrong'})
            : res.json(user)
        )
        .catch((err)=> res.status(400).json(err));
    },
    removeFriend (req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true},
        )
        .then((user)=>
            !user
            ? res
            .status(404)
            .json({message: 'Something went wrong'})
            : res.json(user)
        )
        .catch((err)=> res.status(400).json(err));
    }
   
};
