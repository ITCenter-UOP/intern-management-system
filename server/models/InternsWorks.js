const mongoose = require('mongoose');

const InternWorksSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    works: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const InternWorks = mongoose.model('InternWorks', InternWorksSchema);

module.exports = InternWorks;