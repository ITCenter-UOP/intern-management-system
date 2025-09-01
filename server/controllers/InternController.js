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

            // console.log("Decoded Token:", decoded);

            const user = await User.findOne({ email: decoded.email });
            if (!user) return res.status(404).json({ message: "User not found" });

            const {
                
            } = req.body
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = InternController;