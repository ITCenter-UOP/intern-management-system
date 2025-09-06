const logUserAction = require("secure-mern/utils/logUserAction");
const Project = require("../models/Project");
const User = require("../node_modules/secure-mern/models/User")
const jwt = require('jsonwebtoken')

const ProjectController = {
    create_project: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Token expired. Please log in again." });
                }
                return res.status(400).json({ message: "Invalid token." });
            }

            const user = await User.findOne({ email: decoded.email }).select("-password");
            if (!user) return res.status(404).json({ message: "User not found" });

            const {
                pname,
                pdescription,
                giturl,
                psupervisor,
                pstartdate,
                estimatedEndDate
            } = req.body;


            const checkproject = await Project.findOne({ pname });
            if (checkproject) {
                return res.json({ success: false, message: "Project is Already in System, choose another project Name" });
            }

            const newproject = new Project({
                pname,
                pdescription,
                giturl,
                psupervisor,
                pstartdate,
                estimatedEndDate,
                projectFile: req.file ? req.file.path : null   // ✅ store uploaded file path
            });

            const resultnewproject = await newproject.save();

            if (resultnewproject) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    loginTime: new Date()
                };

                await logUserAction(
                    req,
                    'create_new_project',
                    `${decoded.email} Create New Project with Project Name ${pname}`,
                    metadata,
                    user._id
                );

                return res.json({ success: true, message: "Project Created Successfully" });
            }
        } catch (err) {
            console.error("❌ Error in create_project:", err);
            res.status(500).json({ success: false, message: "Server error while creating project" });
        }
    },


    get_all_projects: async(req, res) => {
        try{
            const getprojects = await Project.find().populate('pmembers').populate('psupervisor')

            return res.json({ success: true, result: getprojects})
        }
        catch (err) {
            console.error("❌ Error in create_project:", err);
            res.status(500).json({ success: false, message: "Server error while creating project" });
        }
    }


};

module.exports = ProjectController;