const User = require("secure-mern/models/User");
const InternLetters = require("../models/InternLetters");
const { createInternShipStartLetter } = require("../utils/letters/InternShipStart");
const sendEmail = require("secure-mern/utils/emailTransporter");
const jwt = require('jsonwebtoken')

const LetterController = {
    create_internship_start_letter: async (req, res) => {
        try {
            const { intern, internname, startat, enddate, supervisor, letter_type } = req.body;

            // Intern check
            const userExists = await User.findById(intern);
            if (!userExists) {
                return res.status(404).json({ success: false, message: "Intern not found" });
            }

            // Supervisor check
            const superviosr_get = await User.findById(supervisor);
            if (!superviosr_get) {
                return res.status(404).json({ success: false, message: "Supervisor not found" });
            }

            // ✅ Generate PDF (just saves to file, doesn’t send res)
            const filePath = await createInternShipStartLetter({
                date: new Date().toLocaleDateString(),
                name: internname,
                startdate: startat,
                enddate,
                superviosrname: superviosr_get.username
            });


            // ✅ Save record
            const newLetter = new InternLetters({
                userID: intern,
                letter_type,
                letter_store_path: filePath,
                letter_infor: [
                    {
                        issue_at: new Date(),
                        start_at: startat,
                        end_at: enddate,
                        supervisor: superviosr_get.username
                    }
                ]
            });

            const resultsaveletter = await newLetter.save();

            if (!resultsaveletter) {
                return res.status(500).json({ success: false, message: "Failed to save letter" });
            }

            // ✅ Send Email
            await sendEmail({
                to: userExists.email,
                subject: "Internship/Training Commencement Letter",
                html: `
                    <p>Dear ${userExists.username},</p>
                    <p>Please find attached your Internship/Training Commencement Letter.</p>
                    <p>Best Regards,<br/>ICT Center, University of Peradeniya</p>
                `,
                attachments: [
                    {
                        filename: `letter_${userExists.username}.pdf`,
                        path: filePath,
                        contentType: "application/pdf"
                    }
                ]
            });

            // ✅ Final JSON response
            return res.json({
                success: true,
                message: "Internship Start Letter created, saved, and emailed successfully"
            });

        } catch (err) {
            console.error("Error creating internship letter:", err);
            return res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    },

    get_all_letters: async (req, res) => {
        try {
            const get_letters = await InternLetters.find().populate('userID')

            return res.json({ success: true, result: get_letters })
        }
        catch (err) {
            console.error("Error creating internship letter:", err);
            return res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    },

    get_my_letters: async (req, res) => {
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

            const getmyletters = await InternLetters.find({ userID: user._id })

            return res.json({ success: true, result: getmyletters })
        }
        catch (err) {
            console.error("Error creating internship letter:", err);
            return res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }
};

module.exports = LetterController;
