const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    pname: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    github_url: {
        type: String,
        required: true,        
    },
    
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;