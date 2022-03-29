import mongoose from 'mongoose';

const CompileSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: false
    },
});

const Compile = mongoose.model('compile', CompileSchema);

export default Compile;