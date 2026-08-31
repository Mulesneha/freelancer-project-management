
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: Number,
      required: true,
      min: 1,
    },

    skills: {
      type: [String],
      required: true,
      default: [],
    },

    deadline: {
      type: Date,
      required: true,
    },

    // Project status
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },

    // Freelancer information
    freelancer: {
      name: {
        type: String,
        default: "Not Assigned",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
