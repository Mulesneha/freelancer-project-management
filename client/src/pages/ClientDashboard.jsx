
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [deadlineFilter, setDeadlineFilter] = useState("All");

  // Sorting
  const [sortBy, setSortBy] = useState("newest");

  // ================= FETCH PROJECTS =================

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

  // ================= LOAD PROJECTS =================

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= FILTER PROJECTS =================

  const filteredProjects = projects
    .filter((project) => {
      // ---------- SEARCH ----------

      const searchText = search
        .toLowerCase()
        .trim();

      const title =
        typeof project.title === "string"
          ? project.title.toLowerCase()
          : "";

      const description =
        typeof project.description === "string"
          ? project.description.toLowerCase()
          : "";

      const skills = Array.isArray(project.skills)
        ? project.skills
            .map((skill) => String(skill).toLowerCase())
            .join(" ")
        : "";

      const matchesSearch =
        searchText === "" ||
        title.includes(searchText) ||
        description.includes(searchText) ||
        skills.includes(searchText);

      // ---------- STATUS ----------

      const projectStatus =
        project.status || "Open";

      const matchesStatus =
        statusFilter === "All" ||
        projectStatus === statusFilter;

      // ---------- BUDGET ----------

      const budget =
        Number(project.budget) || 0;

      let matchesBudget = true;

      if (budgetFilter === "Below 10000") {
        matchesBudget = budget < 10000;
      }

      if (budgetFilter === "10000-50000") {
        matchesBudget =
          budget >= 10000 &&
          budget <= 50000;
      }

      if (budgetFilter === "Above 50000") {
        matchesBudget = budget > 50000;
      }

      // ---------- DEADLINE ----------

      let matchesDeadline = true;

      if (
        deadlineFilter !== "All" &&
        project.deadline
      ) {
        const today = new Date();
        const deadline = new Date(project.deadline);

        const difference =
          deadline.getTime() -
          today.getTime();

        const daysLeft =
          difference /
          (1000 * 60 * 60 * 24);

        if (deadlineFilter === "7days") {
          matchesDeadline =
            daysLeft >= 0 &&
            daysLeft <= 7;
        }

        if (deadlineFilter === "30days") {
          matchesDeadline =
            daysLeft >= 0 &&
            daysLeft <= 30;
        }

        if (deadlineFilter === "Expired") {
          matchesDeadline =
            daysLeft < 0;
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesBudget &&
        matchesDeadline
      );
    })
    // ================= SORT =================
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt || 0) -
          new Date(b.createdAt || 0)
        );
      }

      if (sortBy === "budgetLow") {
        return (
          Number(a.budget || 0) -
          Number(b.budget || 0)
        );
      }

      if (sortBy === "budgetHigh") {
        return (
          Number(b.budget || 0) -
          Number(a.budget || 0)
        );
      }

      if (sortBy === "deadline") {
        return (
          new Date(a.deadline || 0) -
          new Date(b.deadline || 0)
        );
      }

      return 0;
    });

  // ================= CLEAR FILTERS =================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setBudgetFilter("All");
    setDeadlineFilter("All");
    setSortBy("newest");
  };

  // ================= STATISTICS =================

  const totalProjects = projects.length;

  const openProjects = projects.filter(
    (project) =>
      (project.status || "Open") === "Open"
  ).length;

  const inProgressProjects = projects.filter(
    (project) =>
      project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) =>
      project.status === "Completed"
  ).length;

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

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Client Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your projects and freelancers
              in one place.
            </p>

          </div>

          <Link
            to="/create-project"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition text-center"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Total */}

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {totalProjects}
            </h3>

          </div>

          {/* Open */}

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Open Projects
            </p>

            <h3 className="text-3xl font-bold text-orange-500 mt-2">
              {openProjects}
            </h3>

          </div>

          {/* In Progress */}

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              In Progress
            </p>

            <h3 className="text-3xl font-bold text-yellow-500 mt-2">
              {inProgressProjects}
            </h3>

          </div>

          {/* Completed */}

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <p className="text-gray-500">
              Completed Projects
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {completedProjects}
            </h3>

          </div>

        </div>

        {/* ================= SEARCH & FILTER ================= */}

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-xl font-bold text-gray-800">
                Search & Filter
              </h2>

              <p className="text-sm text-gray-500">
                Find projects quickly
              </p>

            </div>

            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* ================= SEARCH ================= */}

            <div className="lg:col-span-2">

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Search
              </label>

              <div className="relative">

                <span className="absolute left-3 top-3 text-gray-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Title, description or skills..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* ================= STATUS ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Open">
                  Open
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            {/* ================= BUDGET ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Budget
              </label>

              <select
                value={budgetFilter}
                onChange={(e) =>
                  setBudgetFilter(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="All">
                  All Budgets
                </option>

                <option value="Below 10000">
                  Below ₹10,000
                </option>

                <option value="10000-50000">
                  ₹10,000 - ₹50,000
                </option>

                <option value="Above 50000">
                  Above ₹50,000
                </option>

              </select>

            </div>

            {/* ================= DEADLINE ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Deadline
              </label>

              <select
                value={deadlineFilter}
                onChange={(e) =>
                  setDeadlineFilter(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="All">
                  All Deadlines
                </option>

                <option value="7days">
                  Within 7 Days
                </option>

                <option value="30days">
                  Within 30 Days
                </option>

                <option value="Expired">
                  Expired
                </option>

              </select>

            </div>

          </div>

          {/* ================= SORT ================= */}

          <div className="mt-5 flex flex-col md:flex-row gap-4 items-start md:items-end">

            <div className="w-full md:w-64">

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Sort Projects
              </label>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="budgetLow">
                  Budget: Low to High
                </option>

                <option value="budgetHigh">
                  Budget: High to Low
                </option>

                <option value="deadline">
                  Nearest Deadline
                </option>

              </select>

            </div>

            <button
              onClick={clearFilters}
              className="bg-gray-200 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Reset Filters
            </button>

          </div>

        </div>

        {/* ================= PROJECT TITLE ================= */}

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-5">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              My Projects
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {projects.length}
              </span>{" "}
              projects
            </p>

          </div>

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

        {!loading &&
          filteredProjects.length === 0 &&
          !error && (

            <div className="bg-white p-10 rounded-xl text-center shadow-sm">

              <div className="text-5xl mb-4">
                🔍
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No projects found
              </h3>

              <p className="text-gray-500 mt-2">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>

            </div>

          )}

        {/* ================= PROJECT CARDS ================= */}

        {!loading &&
          filteredProjects.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredProjects.map((project) => {

                const projectStatus =
                  project.status || "Open";

                return (

                  <div
                    key={project._id}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition"
                  >

                    {/* TITLE + STATUS */}

                    <div className="flex justify-between items-start gap-3">

                      <h3 className="text-xl font-semibold text-gray-800">
                        {project.title}
                      </h3>

                      <span
                        className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                          projectStatus === "Completed"
                            ? "bg-green-100 text-green-700"
                            : projectStatus === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {projectStatus}
                      </span>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="text-gray-500 mt-3 line-clamp-3">
                      {project.description}
                    </p>

                    {/* DETAILS */}

                    <div className="border-t mt-5 pt-4 space-y-3">

                      {/* BUDGET */}

                      <p>

                        <span className="font-semibold">
                          Budget:
                        </span>{" "}

                        ₹
                        {Number(
                          project.budget || 0
                        ).toLocaleString("en-IN")}

                      </p>

                      {/* SKILLS */}

                      <p>

                        <span className="font-semibold">
                          Skills:
                        </span>{" "}

                        {Array.isArray(project.skills) &&
                        project.skills.length > 0
                          ? project.skills.join(", ")
                          : "Not specified"}

                      </p>

                      {/* DEADLINE */}

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

                      {/* POSTED */}

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

                    {/* VIEW PROJECT */}

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

                );
              })}

            </div>

          )}

      </div>

    </div>
  );
};

export default ClientDashboard;
