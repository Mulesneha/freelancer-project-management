
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReviewProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [freelancerId, setFreelancerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a review");
      return;
    }

    if (!freelancerId) {
      setError("Freelancer ID is required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            projectId,
            freelancerId,
            rating,
            comment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit review"
        );
      }

      setSuccess("Review submitted successfully!");

      setRating(0);
      setComment("");

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-8">

          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline mb-6"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Review Freelancer
          </h1>

          <p className="text-gray-500 mt-2">
            Share your experience working on this project.
          </p>

          {error && (
            <div className="mt-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg">
              {success}
            </div>
          )}

          <form
            onSubmit={submitReview}
            className="mt-8 space-y-6"
          >

            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Freelancer ID
              </label>

              <input
                type="text"
                value={freelancerId}
                onChange={(e) =>
                  setFreelancerId(e.target.value)
                }
                placeholder="Enter freelancer ID"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-4xl transition ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="text-gray-500 mt-2">
                {rating > 0
                  ? `${rating} out of 5`
                  : "Select a rating"}
              </p>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Your Review
              </label>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                rows="6"
                placeholder="Write your feedback..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit Review"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewProject;
