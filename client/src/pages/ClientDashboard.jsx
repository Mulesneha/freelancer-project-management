import React from "react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "Need a modern and responsive online shopping website.",
      status: "In Progress",
      budget: "₹25,000",
      freelancer: "Rahul Sharma",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio website with modern UI and animations.",
      status: "Open",
      budget: "₹10,000",
      freelancer: "Not Assigned",
    },
    {
      id: 3,
      title: "Mobile Application",
      description: "Android application for managing daily tasks.",
      status: "Completed",
      budget: "₹30,000",
      freelancer: "Sneha Mule",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            FreelancerHub
          </h1>
        </div>

        <div className="flex gap-5 items-center">
          <span className="text-gray-600">Welcome, Client 👋</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Client Dashboard
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your projects and freelancers in one place.
            </p>
          </div>

          <Link
            to="/create-project"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Post New Project
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Projects</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">3</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Active Projects</p>
            <h3 className="text-3xl font-bold text-orange-500 mt-2">1</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Completed Projects</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">1</h3>
          </div>
        </div>

        {/* Projects */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">
                  {project.title}
                </h3>

                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : project.status === "In Progress"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-gray-500 mt-3">{project.description}</p>

              <div className="border-t mt-5 pt-4 space-y-2">
                <p>
                  <span className="font-semibold">Budget:</span>{" "}
                  {project.budget}
                </p>

                <p>
                  <span className="font-semibold">Freelancer:</span>{" "}
                  {project.freelancer}
                </p>
              </div>

              <button className="mt-5 w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">
                View Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;