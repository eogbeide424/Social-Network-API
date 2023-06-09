const {Schema, model} = require('mongoose');
const Reactions = require('./Reactions');

const thoughtSchema = new Schema(
    {
     thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => {
            return createdAtVal.toDateString();
        },

    },
    username: {
        type: String,
        required: true,
        ref: 'User',
    },
    reactions: [Reactions],

},
{
    toJSON: {
        virtuals: true,
    },
        id: false,
  },
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;