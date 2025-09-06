const logUserAction = require("secure-mern/utils/logUserAction");
const Project = require("../models/Project");
const User = require("../node_modules/secure-mern/models/User")

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
                pmembers,
                psupervisor,
                pstartdate,
                estimatedEndDate
            } = req.body

            const checkproject = await Project.findOne({ pname: pname })
            if (checkproject) {
                return res.json({ success: false, message: "Project is Already in System, choose another project Name" })
            }

            const newproject = new Project({
                pname: pname,
                pdescription: pdescription,
                giturl: giturl,
                pmembers: pmembers,
                psupervisor: psupervisor,
                pstartdate: pstartdate,
                estimatedEndDate: estimatedEndDate
            })

   
            if (req.file) {
                newproject.projectfiles = req.file.path; 
            }

            const resultnewproject = await newproject.save()

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
                return res.json({ success: true, message: "Project Created Successfull" })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

};

module.exports = ProjectController;