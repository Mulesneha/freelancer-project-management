import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/projects"
      );

      const data = await response.json();

      console.log("Projects received:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch projects"
        );
      }

      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }

    } catch (err) {
      console.error("Fetch projects error:", err);

      setError(
        "Unable to load projects. Make sure the backend server and MongoDB are running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load projects when dashboard opens
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          FreelancerHub
        </h1>

        <div className="flex items-center gap-4">

          <span className="text-gray-600">
            Welcome, Client 👋
          </span>

        </div>
      </nav>


      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto p-6">

        {/* ================= HEADER ================= */}
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


        {/* ================= ERROR ================= */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">

            <p className="font-semibold">
              Error
            </p>

            <p>
              {error}
            </p>

            <button
              onClick={fetchProjects}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}


        {/* ================= STATISTICS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Total */}
          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {projects.length}
            </h3>

          </div>


          {/* Open */}
          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Open Projects
            </p>

            <h3 className="text-3xl font-bold text-orange-500 mt-2">
              {projects.length}
            </h3>

          </div>


          {/* Completed */}
          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Completed Projects
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              0
            </h3>

          </div>

        </div>


        {/* ================= PROJECT TITLE ================= */}
        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold text-gray-800">
            My Projects
          </h2>

          <button
            onClick={fetchProjects}
            className="border border-gray-300 bg-white px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            🔄 Refresh
          </button>

        </div>


        {/* ================= LOADING ================= */}
        {loading && (
          <div className="bg-white p-10 rounded-xl text-center shadow-sm">

            <p className="text-gray-500 text-lg">
              Loading projects...
            </p>

          </div>
        )}


        {/* ================= NO PROJECTS ================= */}
        {!loading && projects.length === 0 && !error && (

          <div className="bg-white p-10 rounded-xl text-center shadow-sm">

            <div className="text-5xl mb-4">
              📂
            </div>

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

        )}


        {/* ================= PROJECT CARDS ================= */}
        {!loading && projects.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project) => (

              <div
                key={project._id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition"
              >

                {/* Title + Status */}
                <div className="flex justify-between items-start gap-3">

                  <h3 className="text-xl font-semibold text-gray-800">
                    {project.title}
                  </h3>

                  <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                    Open
                  </span>

                </div>


                {/* Description */}
                <p className="text-gray-500 mt-3">
                  {project.description}
                </p>


                {/* Details */}
                <div className="border-t mt-5 pt-4 space-y-3">

                  {/* Budget */}
                  <p>
                    <span className="font-semibold">
                      Budget:
                    </span>{" "}
                    ₹{Number(project.budget).toLocaleString("en-IN")}
                  </p>


                  {/* Skills */}
                  <p>
                    <span className="font-semibold">
                      Skills:
                    </span>{" "}
                    {Array.isArray(project.skills) &&
                    project.skills.length > 0
                      ? project.skills.join(", ")
                      : "Not specified"}
                  </p>


                  {/* Deadline */}
                  <p>
                    <span className="font-semibold">
                      Deadline:
                    </span>{" "}
                    {project.deadline
                      ? new Date(
                          project.deadline
                        ).toLocaleDateString("en-IN")
                      : "Not specified"}
                  </p>


                  {/* Created Date */}
                  <p>
                    <span className="font-semibold">
                      Posted:
                    </span>{" "}
                    {project.createdAt
                      ? new Date(
                          project.createdAt
                        ).toLocaleDateString("en-IN")
                      : "Recently"}
                  </p>

                </div>


                {/* View Project */}
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

export default ClientDashboard;