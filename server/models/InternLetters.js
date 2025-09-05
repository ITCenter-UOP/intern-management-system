const mongoose = require('mongoose');

const InternLettersSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    letter_type: {
        type: String,
        enum: ['internship_start_letter', 'letter_of_internship'],
        required: true
    },
    letter_store_path: {
        type: String,
        required: true
    },    
    letter_infor: [
        {
            issue_at: { type: Date },
            start_at: { type: Date },
            end_at: { type: Date },
            supervisor: { type: String }
        }
    ]
}, { timestamps: true });

const InternLetters = mongoose.model('InternLetters', InternLettersSchema);

module.exports = InternLetters;
