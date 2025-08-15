"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addteachers } from "@/redux/teatcherSlice";
import { RootState } from "@/redux/store";

const initialFormData = {
    name: "",
    email: "",
    phone: "",
    job: "",
    about: "",
    education: "",
    experites: "",
    city: "",
    image: null as File | null,
};

const CreateTeacherForm = ({ onClose }: { onClose?: () => void }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const currentUser = useAppSelector(
        (state: RootState) => state.auth.currentUser
    );
    const adminEmail = "alaasaboukh1@gmail.com";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = "";

            if (formData.image) {
                const formDataCloud = new FormData();
                formDataCloud.append("file", formData.image);
                formDataCloud.append("upload_preset", "unsigned_teachers");

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dqdwjumwk/image/upload",
                    {
                        method: "POST",
                        body: formDataCloud,
                    }
                );

                const data = await response.json();
                imageUrl = data.secure_url;
            }

            const { ...restData } = formData;

            const newTeacher = {
                ...restData,
                education: restData.education,
                phone: formData.phone.toString(),
                imageUrl,
                createdAt: new Date().toISOString(),
            };

            await dispatch(addteachers(newTeacher)).unwrap();

            setFormData(initialFormData);
            onClose?.();
        } catch (error) {
            console.error("❌ Error adding teacher:", error);
        } finally {
            setLoading(false);
        }
    };

    if (currentUser?.email !== adminEmail) {
        return <div>The page is available to admins only.</div>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[var(--color-secondary)]  p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
            <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                name="job"
                placeholder="Job Title"
                value={formData.job}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                name="education"
                placeholder="Education (years)"
                value={formData.education}
                onChange={handleChange}
                type="number"
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                name="experites"
                placeholder="Experience"
                value={formData.experites}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                name="about"
                placeholder="About"
                value={formData.about}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        image: e.target.files ? e.target.files[0] : null,
                    }))
                }
                className="border border-gray-300 p-2 rounded"
            />
            <button
                type="submit"
                disabled={loading}
                className="col-span-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Adding..." : "Add Teacher"}
            </button>
        </form>
    );
};

export default CreateTeacherForm;
