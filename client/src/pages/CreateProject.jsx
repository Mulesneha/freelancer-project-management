
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skills: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit project
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Convert skills string into array
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      // Data sent to backend
      const projectData = {
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        skills: skillsArray,
        deadline: formData.deadline,
      };

      console.log("Sending project:", projectData);

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      alert("Project posted successfully! 🚀");

      // Clear form
      setFormData({
        title: "",
        description: "",
        budget: "",
        skills: "",
        deadline: "",
      });

      // Go to dashboard
      navigate("/client-dashboard");

    } catch (error) {
      console.error("Create project error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          FreelancerHub
        </h1>

        <Link
          to="/client-dashboard"
          className="text-gray-600 hover:text-blue-600"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow-sm p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Create New Project 🚀
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Post your project and find the right freelancer.
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Project Title */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Project Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your project..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Budget (₹)
              </label>

              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter budget"
                required
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Required Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-sm text-gray-400 mt-1">
                Separate skills using commas.
              </p>
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Project Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Posting Project..." : "Post Project 🚀"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
