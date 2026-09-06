
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FreelancerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUser = () => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  };

  const user = getUser();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "No authentication token found. Please log in again."
        );
      }

      const response = await fetch(
        "http://localhost:5000/api/projects",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch projects"
        );
      }

      setProjects(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Fetch projects error:",
        err
      );

      setError(
        err.message ||
          "Unable to load projects"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          FreelancerHub
        </h1>

        <div className="flex items-center gap-4">

          <span className="text-gray-600">
            Welcome, {user?.name || "Freelancer"} 👋
          </span>

          <Link
            to="/notifications"
            className="relative border border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            🔔 Notifications
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Freelancer Dashboard
          </h2>

          <p className="text-gray-500 mt-1">
            Find projects, manage your work, and track your progress.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Available Projects
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {projects.length}
            </h3>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              My Active Projects
            </p>

            <h3 className="text-3xl font-bold text-orange-500 mt-2">
              0
            </h3>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Completed Projects
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              0
            </h3>

          </div>

        </div>

        {error && (

          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">

            <p className="font-semibold">
              Error
            </p>

            <p>{error}</p>

            <button
              onClick={fetchProjects}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>

          </div>

        )}

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold text-gray-800">
            Available Projects
          </h2>

          <button
            onClick={fetchProjects}
            className="border border-gray-300 bg-white px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            🔄 Refresh
          </button>

        </div>

        {loading && (

          <div className="bg-white p-10 rounded-xl text-center shadow-sm">

            <p className="text-gray-500 text-lg">
              Loading projects...
            </p>

          </div>

        )}

        {!loading &&
          projects.length === 0 &&
          !error && (

            <div className="bg-white p-10 rounded-xl text-center shadow-sm">

              <div className="text-5xl mb-4">
                📂
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No projects available
              </h3>

              <p className="text-gray-500 mt-2">
                There are currently no projects available.
              </p>

            </div>

          )}

        {!loading &&
          projects.length > 0 && (

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
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {project.status || "Open"}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-3">
                    {project.description}
                  </p>

                  <div className="border-t mt-5 pt-4 space-y-3">

                    <p>
                      <span className="font-semibold">
                        Budget:
                      </span>{" "}
                      ₹
                      {Number(
                        project.budget || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Skills:
                      </span>{" "}
                      {Array.isArray(project.skills) &&
                      project.skills.length > 0
                        ? project.skills.join(", ")
                        : "Not specified"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Deadline:
                      </span>{" "}
                      {project.deadline
                        ? new Date(
                            project.deadline
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "Not specified"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Posted:
                      </span>{" "}
                      {project.createdAt
                        ? new Date(
                            project.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "Recently"}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      alert(
                        `Project: ${project.title}`
                      )
                    }
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

export default FreelancerDashboard;
