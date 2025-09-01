import React, { useState, useEffect } from "react";
import API from "../../../services/api";
import DefaultInput from "../../../component/Form/DefaultInput";
import DateInput from "../../../component/Form/DateInput";
import FileInput from "../../../component/Form/FileInput";

const InternProfile = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [form, setForm] = useState({
        address: "",
        dob: "",
        camups: "",
        course: "",
        github: "",
        linkedin: "",
        cv: "",
    });

    const [isFirstUpdate, setIsFirstUpdate] = useState(false);

    // Fetch current intern info
    useEffect(() => {
        if (!token) return;

        const fetchInternInfo = async () => {
            try {
                const res = await API.get("/intern/get-intern-information", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.success && res.data.data) {
                    const data = res.data.data;

                    setForm({
                        address: data.address || "",
                        dob: data.dob ? data.dob.split("T")[0] : "",
                        camups: data.camups || "",
                        course: data.course || "",
                        github: data.github || "",
                        linkedin: data.linkedin || "",
                        cv: "", // Initialize CV empty
                    });

                    // First-time update check
                    if (!data.address && !data.dob && !data.camups && !data.course) {
                        setIsFirstUpdate(true);
                    }
                } else {
                    setIsFirstUpdate(true);
                }
            } catch (err) {
                console.error("Failed to fetch intern info:", err);
                setIsFirstUpdate(true);
            }
        };

        fetchInternInfo();
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            // Required fields
            if (!form.address || !form.dob || !form.camups || !form.course) {
                alert("Address, DOB, Campus, and Course are required.");
                setLoading(false);
                return;
            }

            formData.append("address", form.address);
            formData.append("dob", form.dob);
            formData.append("camups", form.camups);
            formData.append("course", form.course);

            // Always append optional fields to prevent backend validation errors
            formData.append("github", form.github || "");
            formData.append("linkedin", form.linkedin || "");
            if (file) formData.append("cv", file);

            const res = await API.post(
                `/intern/update-intern-information?nocache=${Date.now()}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                }
            );

            if (res.data.success) {
                alert(res.data.message || "Profile updated successfully");
                window.location.reload();
            } else {
                alert(res.data.message || "Failed to update profile");
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Something went wrong while updating");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-6">Intern Profile</h1>

            <form onSubmit={handleSubmit}>
                <DefaultInput
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                />

                <DateInput
                    label="Date of Birth"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    required
                />

                <DefaultInput
                    label="Campus"
                    name="camups"
                    value={form.camups}
                    onChange={handleChange}
                    placeholder="Enter your campus"
                    required
                />

                <DefaultInput
                    label="Course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    placeholder="Enter your course"
                    required
                />

                <DefaultInput
                    label="GitHub URL"
                    name="github"
                    value={form.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                />

                <DefaultInput
                    label="LinkedIn URL"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                />

                <FileInput
                    label="Upload CV"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default InternProfile;
