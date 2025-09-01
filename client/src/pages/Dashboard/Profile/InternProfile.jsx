import React, { useState } from "react";
import API from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

// custom input components
import DefaultInput from "../../../component/Form/DefaultInput";
import DateInput from "../../../component/Form/DateInput";
import Dropdown from "../../../component/Form/Dropdown";
import FileInput from "../../../component/Form/FileInput";

const InternProfile = () => {
    const { token } = useAuth();
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        address: "",
        dob: "",
        camups: "",
        course: "",
        github: "",
        linkedin: "",
        InternshipEndAt: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdateIntern = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) {
            formData.append("cv", file); // 📂 CV file
        }
        Object.keys(form).forEach((key) => {
            if (form[key]) formData.append(key, form[key]);
        });

        try {
            const res = await API.post(
                `/intern/update-intern-information?nocache=${Date.now()}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success === true) {
                alert(res.data.message);
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update intern information. Please try again.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-6">Intern Profile</h1>

            <form onSubmit={handleUpdateIntern}>
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
                    label="GitHub"
                    name="github"
                    value={form.github}
                    onChange={handleChange}
                    placeholder="GitHub profile URL"
                />

                <DefaultInput
                    label="LinkedIn"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn profile URL"
                />

                <DateInput
                    label="Internship End Date"
                    name="InternshipEndAt"
                    value={form.InternshipEndAt}
                    onChange={handleChange}
                />

                <FileInput
                    label="Upload CV"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default InternProfile;
