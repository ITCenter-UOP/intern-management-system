const jwt = require("jsonwebtoken");
const logUserAction = require("secure-mern/utils/logUserAction");
const InternInformation = require('../models/InternInformation');
const User = require('../node_modules/secure-mern/models/User');

const InternController = {
    update_intern_data: async (req, res) => {
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

            const user = await User.findOne({ email: decoded.email });
            if (!user) return res.status(404).json({ message: "User not found" });

            const {
                InternshipEndAt,
                address,
                dob,
                github,
                linkedin,
                camups,
                course
            } = req.body;

            // console.log(req.body, req.file)

            const cvFile = req.file ? req.file.filename : undefined;

            let internInfo = await InternInformation.findOne({ userID: user._id });

            if (!internInfo) {
                // First time → allow all fields, only if provided
                internInfo = new InternInformation({
                    userID: user._id,
                    address,
                    dob,
                    camups,
                    course,
                    github: github || undefined,
                    linkedin: linkedin || undefined,
                    cv: cvFile,
                    isApprove: true,
                    InternshipEndAt: InternshipEndAt || undefined,
                });
            } else {
                // Check if it's the very first update (all 4 restricted fields empty)
                const isFirstUpdate =
                    !internInfo.address &&
                    !internInfo.dob &&
                    !internInfo.camups &&
                    !internInfo.course;

                if (isFirstUpdate) {
                    // First update on an existing record: only allow address, dob, camups, course
                    if (address) internInfo.address = address;
                    if (dob) internInfo.dob = dob;
                    if (camups) internInfo.camups = camups;
                    if (course) internInfo.course = course;
                } else {
                    // Later updates: allow everything
                    if (InternshipEndAt) internInfo.InternshipEndAt = InternshipEndAt;
                    if (address) internInfo.address = address;
                    if (dob) internInfo.dob = dob;
                    if (camups) internInfo.camups = camups;
                    if (course) internInfo.course = course;
                    if (github) internInfo.github = github;
                    if (linkedin) internInfo.linkedin = linkedin;
                    if (cvFile) internInfo.cv = cvFile;
                }
            }

            await internInfo.save();

            await logUserAction(
                req,
                'update_intern_information',
                `${decoded.email} Update Intern Information Success`,
                user._id
            );

            return res.json({
                success: true,
                message: "Intern information saved successfully",
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    },

    get_intern_data: async (req, res) => {
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

            const user = await User.findOne({ email: decoded.email });
            if (!user) return res.status(404).json({ message: "User not found" });

            const get_intern_data = await InternInformation.findOne({ userID: user._id });

            return res.json({ success: true, data: get_intern_data });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    },

    admin_get_interndata: async (req, res) => {
        try {
            const email = req.params.email

            const get_intern_as_user = await User.findOne({ email: email })

            const get_intern = await InternInformation.findOne({ userID: get_intern_as_user._id })

            return res.json({ success: true, result: get_intern })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    }
};

module.exports = InternController;
