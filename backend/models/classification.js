const mongoose = require('mongoose');

const classificationSchema = mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
}, { timestamps: {} });


module.exports = mongoose.model('Classification', classificationSchema);