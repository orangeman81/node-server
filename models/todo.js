const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        title: { type: String, required: true, index: 'text' },
        description: { type: String, required: false },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);