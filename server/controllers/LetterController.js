const User = require("secure-mern/models/User");
const InternLetters = require("../models/InternLetters");
const { createInternShipStartLetter } = require("../utils/letters/InternShipStart");

const LetterController = {
    create_internship_start_letter: async (req, res) => {
        try {
            const {
                intern,
                startat,
                enddate,
                supervisor,
                letter_type
            } = req.body;

            const userExists = await User.findById(intern);
            if (!userExists) {
                return res.status(404).json({ success: false, message: "Intern not found" });
            }

            const superviosr_get = await User.findById(supervisor);
            if (!superviosr_get) {
                return res.status(404).json({ success: false, message: "Superviosr not found" });
            }


            const filePath = await createInternShipStartLetter({
                date: new Date(),
                name: userExists.username,
                startdate: startat,
                enddate,
                superviosrname: superviosr_get.username,
                req,
                res
            });

            const newLetter = new InternLetters({
                userID: intern,
                letter_type,
                letter_store_path: filePath,
                letter_infor: [
                    {
                        issue_at: new Date(date),
                        start_at: startat,
                        end_at: enddate,
                        supervisor: superviosr_get.username
                    }
                ]
            });

            const resultsaveletter = await newLetter.save();

            if (resultsaveletter) {
                return res.json({ success: true, message: "Internship Start Letter Successfully Created" })
            }

        } catch (err) {
            console.error("Error creating internship letter:", err);
            return res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }
};

module.exports = LetterController;
