const {Thought, User} = require('../models');

module.exports = {

    // get all thoughts

    getThoughts (req, res) {
        Thought.find()
            .populate({path: 'reactions', select: '-__v'})
            .then((thoughts)=> res.json(thoughts))
            .catch((err)=> res.status(500).json(err));
    },

    // get one thought by id

    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId})
            .populate({path: 'reactions', select: '-__v'})
            .then((thought)=> res.json(thought))
            .catch((err)=> res.status(400).json(err));
    },

    // create a thought
    createThought (req, res){
        Thought.create(req.body)
            .then((thought)=> {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );
            })
            .then((user)=> 
               !user
                ? res.status(404).json({message: 'something went wrong'})
                : res.json("Thank you for your thought!"))
            .catch((err)=> res.status(400).json(err));
    },

    // update a thought by id
    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought)=> res.json(thought))
        .catch((err)=> res.status(400).json(err));
    },

    // delete a thought by id
    deleteThought(req, res){
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought)=>
        !thought
         ? res.status(404).json({message: 'No thought found with this id'})
         : User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {thoughts: req.params.thoughtId}},
            {new: true}
         ))
         .then((user)=>
         !user
         ? res.status(404)
         .json({message: 'No user found with this id'})
         : res.json({message: 'Thought deleted'})
         )
         .catch((err)=> res.status(400).json(err))
    },

    // add a reaction to a thought
    addReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        ).then((thought)=>
        !thought
        ? res.status(404).json({message: 'Something went wrong'})
        : res.json(thought))
        .catch((err)=> res.status(400).json(err));
    },

    // delete a reaction from a thought
    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        ).then((thought)=>
        !thought
        ? res.status(404).json({message: 'Something went wrong'})
        : res.json(thought))
        .catch((err)=> res.status(400).json(err));
    },

};