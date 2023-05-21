const {Schema, model} = require('mongoose');
const datejs = require('datejs');

thoughtSchema = new Schema(
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
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ],


},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;