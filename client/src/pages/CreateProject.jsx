import React from "react";
import { Link } from "react-router-dom";

const CreateProject = () => {
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

      {/* Form */}
      <div className="max-w-3xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow-sm p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Create New Project 🚀
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Post your project and find the right freelancer.
          </p>

          <form className="space-y-6">

            {/* Project Title */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Project Title
              </label>

              <input
                type="text"
                placeholder="Enter project title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Project Description
              </label>

              <textarea
                rows="5"
                placeholder="Describe your project..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Budget */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Budget
              </label>

              <input
                type="number"
                placeholder="Enter budget in ₹"
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
                placeholder="e.g. React, Node.js, MongoDB"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Post Project
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;