
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/projects");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch projects");
      }

      // Make sure data is an array
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch projects error:", err);
      setError("Unable to load projects. Make sure your server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  );

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          FreelancerHub
        </h1>

        <div className="flex gap-5 items-center">
          <span className="text-gray-600">
            Welcome, Client 👋
          </span>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
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

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {projects.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Active Projects
            </p>

            <h3 className="text-3xl font-bold text-orange-500 mt-2">
              {activeProjects.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Completed Projects
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {completedProjects.length}
            </h3>
          </div>

        </div>

        {/* Projects */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          My Projects
        </h2>

        {loading ? (
          <div className="bg-white p-10 rounded-xl text-center">
            <p className="text-gray-500">
              Loading projects...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center">

            <h3 className="text-xl font-semibold text-gray-700">
              No projects yet
            </h3>

            <p className="text-gray-500 mt-2">
              Create your first project to get started.
            </p>

            <Link
              to="/create-project"
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              + Create Project
            </Link>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition"
              >

                <div className="flex justify-between items-start gap-3">

                  <h3 className="text-xl font-semibold text-gray-800">
                    {project.title}
                  </h3>

                  <span
                    className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "In Progress"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {project.status || "Open"}
                  </span>

                </div>

                <p className="text-gray-500 mt-3">
                  {project.description}
                </p>

                <div className="border-t mt-5 pt-4 space-y-2">

                  <p>
                    <span className="font-semibold">
                      Budget:
                    </span>{" "}
                    ₹{project.budget}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Skills:
                    </span>{" "}
                    {Array.isArray(project.skills)
                      ? project.skills.join(", ")
                      : "Not specified"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Deadline:
                    </span>{" "}
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString()
                      : "Not specified"}
                  </p>

                </div>

                <button
                  className="mt-5 w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  View Project
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default ClientDashboard;

