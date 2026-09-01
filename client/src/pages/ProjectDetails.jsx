import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/projects/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Project not found");
        }

        setProject(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Project Not Found
          </h2>

          <p className="text-gray-500 mt-2">{error}</p>

          <Link
            to="/client-dashboard"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Project */}
      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow-md p-8">

          <div className="flex justify-between items-start gap-4">

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {project.title}
              </h2>

              <p className="text-gray-400 mt-2">
                Posted on{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              Open
            </span>

          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Project Description
            </h3>

            <p className="text-gray-600 mt-3 leading-7">
              {project.description}
            </p>
          </div>

          {/* Budget */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Budget
            </h3>

            <p className="text-2xl font-bold text-green-600 mt-2">
              ₹{project.budget}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2 mt-3">
              {project.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Deadline
            </h3>

            <p className="text-gray-600 mt-2">
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "Not specified"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;