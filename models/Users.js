const {Schema, model} = require('mongoose');


// const validateEmail = function(email) {
//     const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return regex.test(email);
//   };

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            unique: true,
            required: true,
           
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            }
        ],
        
    },
    {
        toJSON:{
            virtuals: true,
        },
        id: false,
    });

    userSchema.virtual('friendCount').get(function(){
        return this.friends.length;
    });

    const User = model('User' , userSchema);
    module.exports = User;