const logUserAction = require("secure-mern/utils/logUserAction");

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

            // 📂 Handle CV file (if uploaded)
            const cvFile = req.file ? req.file.filename : null;

            let internInfo = await InternInformation.findOne({ userID: user._id });

            if (!internInfo) {
                // 🆕 First time → allow all fields
                internInfo = new InternInformation({
                    userID: user._id,
                    InternshipEndAt,
                    address,
                    cv: cvFile,   // ✅ store uploaded CV filename
                    dob,
                    github,
                    linkedin,
                    camups,
                    isApprove: true,
                    course
                });
            } else {
                // ✅ Check if it's the very first update (all 4 restricted fields empty)
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
                    if (cvFile) internInfo.cv = cvFile;   // ✅ update CV if new file uploaded
                    if (dob) internInfo.dob = dob;
                    if (github) internInfo.github = github;
                    if (linkedin) internInfo.linkedin = linkedin;
                    if (camups) internInfo.camups = camups;
                    if (course) internInfo.course = course;
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

        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = InternController;