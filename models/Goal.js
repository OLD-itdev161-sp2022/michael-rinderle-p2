import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
    created: {
        type: Date,
        required: true
    },
    goal: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    completed: {
        type: Date,
        required: false
    }
});

const Goal = mongoose.model('goal', GoalSchema);

export default Goal;