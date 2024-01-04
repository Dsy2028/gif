import mongoose from 'mongoose'

const unitSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'topics' }]
});

const unit = mongoose.model('units', unitSchema);

export default unit;